import { useEffect } from "react";

const useRefetchOnIdChange = (id: number | undefined, refetch: () => void) => {
  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);
};

export default useRefetchOnIdChange;
