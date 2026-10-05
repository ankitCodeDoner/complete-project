import Swal from "sweetalert2";

export const showDeleteConfirm = async (
  title = "Are you sure?",
  text = "This action cannot be undone!"
): Promise<boolean> => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  return result.isConfirmed;
};
