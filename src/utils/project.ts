import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useEffect, useCallback } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useProjects = (param: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
    // client("projects", { data: cleanObject(debouncedParam) })
    //   .then(setList)
    //   .catch((error) => {
    //     setList([]);
    //     setError(error);
    //   })
    //   .finally(() => setIsLoading(true));
  }, [param, run, fetchProjects]);

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return { mutate, ...asyncResult };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return { mutate, ...asyncResult };
};
