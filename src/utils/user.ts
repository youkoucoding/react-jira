import { User } from "screens/project-list/search-panel";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
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
