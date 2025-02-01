import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  // The React Query custom hook for mutations
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    // Tell react query what to do when function is successful
    // You can "invalidate" cache with react query
    // Basically, this below code "invalidates" the cabins query key
    // --- this causes a refresh
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
