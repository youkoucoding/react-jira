import { useHttp } from "utils/http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderKanbanConfig,
} from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) => client(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

export interface SortProps {
  // 要重置位置的 元素
  fromId: number;
  // 重置的目标元素
  referenceId: number;
  // 目标元素的 前  或者  后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
    return client("kanbans/reorder", {
      data: params,
      method: "POST",
    });
  }, useReorderKanbanConfig(queryKey));
};
