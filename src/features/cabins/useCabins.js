import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  //useQuery is the custom hook we frequently use
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    //this queryFn needs to return a promise
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
