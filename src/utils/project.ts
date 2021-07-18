import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";

export const useProject = (param: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param) }));
    // client("projects", { data: cleanObject(debouncedParam) })
    //   .then(setList)
    //   .catch((error) => {
    //     setList([]);
    //     setError(error);
    //   })
    //   .finally(() => setIsLoading(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
