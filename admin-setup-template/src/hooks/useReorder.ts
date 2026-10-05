import { useCallback } from "react";
import toast from "react-hot-toast";
import { getApiError, moveId } from "../utils/helper";

interface UseReorderProps<T extends { id: number | string }> {
  items: T[];
  reorderFn: (ids: (number | string)[]) => Promise<unknown>;
  refetch: () => void;
}

/** Move a record up/down; the website shows these lists in saved order. */
export const useReorder = <T extends { id: number | string }>({
  items,
  reorderFn,
  refetch,
}: UseReorderProps<T>) => {
  const handleMove = useCallback(
    async (index: number, direction: -1 | 1) => {
      try {
        await reorderFn(moveId(items, index, direction));
        refetch();
      } catch (error) {
        toast.error(getApiError(error, "Could not change the order."));
      }
    },
    [items, reorderFn, refetch]
  );

  return { handleMove };
};
