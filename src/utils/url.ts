import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
/**
 *
 * return 页面中指定键的参数值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev: {}, key: K) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // 基本类型，组件状态，可以放入依赖项中；非组件状态的‘对象’！，不可以放入依赖
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    setSearchParam,
  ] as const;
};
