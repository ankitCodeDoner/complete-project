import { useCallback, useState } from "react";

/** Open/close state for a create-or-edit RightDrawer. `selected` is null when creating. */
export const useDrawerState = <T>() => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const openCreate = useCallback(() => {
    setSelected(null);
    setOpen(true);
  }, []);

  const openEdit = useCallback((item: T) => {
    setSelected(item);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  return { open, selected, openCreate, openEdit, close };
};
