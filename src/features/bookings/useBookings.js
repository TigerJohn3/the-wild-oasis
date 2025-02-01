import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //  Filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // Sort
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PATGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //useQuery is the custom hook we frequently use
  // Query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // you add the filter object here so when the filter object changes...
    // React query will refetch data
    queryKey: ["bookings", filter, sortBy, page],
    //this queryFn needs to return a promise
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      //this queryFn needs to return a promise
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      //this queryFn needs to return a promise
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
