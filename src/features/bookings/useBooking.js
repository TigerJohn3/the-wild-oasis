import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  console.log("bookingID: ", bookingId);

  //useQuery is the custom hook we frequently use
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    //this queryFn needs to return a promise
    queryFn: () => getBooking(bookingId),
    // The retry false makes it so React Query DOESNT call api three times in case of failure
    retry: false,
  });

  console.log("Booking: ", booking);

  return { isLoading, booking, error };
}
