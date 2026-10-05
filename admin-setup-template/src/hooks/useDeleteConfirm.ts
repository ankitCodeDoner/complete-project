import { useCallback } from "react";
import { showDeleteConfirm } from "../utils/alerts/confirmDelete";
import toast from "react-hot-toast";

interface UseDeleteConfirmProps {
  label: string;
  deleteFn: (id: number) => Promise<any>;
  refetch?: () => void;
}

export const useDeleteConfirm = ({
  label,
  deleteFn,
  refetch,
}: UseDeleteConfirmProps) => {
  const handleDelete = useCallback(
    async (id: number) => {
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
