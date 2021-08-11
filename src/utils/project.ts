import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useEffect, useCallback } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectsSearchParams } from "screens/project-list/util";
import { isQueryKey } from "react-query/types/core/utils";

export const useProjects = (param: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParams();
  const queryKey = ["projects", searchParams];
  return useMutation(
    (params: Partial<Project>) =>
      client(`project/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target: Partial<Project>) {
        const previousItems = queryClient.getQueryData(queryKey);
        queryClient.setQueriesData(queryKey, (old?: Project[]) => {
          return old.map((project) =>
            project.id === target.id ? { ...project, ...target } : project
          );
        });
        return { previousItems };
      },
      //回滚
      onError(error, newItem: Partial<Project>, context: TContext | undefined) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
    }
  );
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return (
    useQuery<Project>(["project", { id }], () => client(`project/${id}`)),
    {
      enabled: Boolean(id),
    }
  );
};
