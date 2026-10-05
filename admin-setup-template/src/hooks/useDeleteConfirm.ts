import { useCallback } from "react";
import { showDeleteConfirm } from "../utils/alerts/confirmDelete";
import toast from "react-hot-toast";

interface UseDeleteConfirmProps<Id extends number | string> {
  label: string;
  deleteFn: (id: Id) => Promise<any>;
  refetch?: () => void;
}

export const useDeleteConfirm = <Id extends number | string = number>({
  label,
  deleteFn,
  refetch,
}: UseDeleteConfirmProps<Id>) => {
  const handleDelete = useCallback(
    async (id: Id) => {
      const confirm = await showDeleteConfirm(
        `Delete ${label}?`,
        `This will permanently remove the ${label}.`
      );

      if (!confirm) return;

      try {
        await deleteFn(id);
        toast.success(`${label} deleted successfully`);
        refetch?.();
      } catch (error: any) {
        console.error("Delete failed:", error);
        toast.error(error?.data?.message || `Failed to delete ${label}.`);
      }
    },
    [label, deleteFn, refetch]
  );

  return { handleDelete };
};
