import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  // The React Query custom hook for mutations
  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    // Tell react query what to do when function is successful
    // You can "invalidate" cache with react query
    // Basically, this below code "invalidates" the cabins query key
    // --- this causes a refresh
    onSuccess: () => {
      toast.success("Booking successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
}
