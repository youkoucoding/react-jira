import { useSearchParams } from "react-router-dom";
/**
 * return 页面中指定键的参数值
 */

export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    keys.reduce((prev: {}, key: string) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParam,
  ] as const;
};
