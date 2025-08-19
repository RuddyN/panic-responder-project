import { useQuery } from "@tanstack/react-query";
import type { Responder } from "../api/responders/types";
import { getResponders } from "../api/responders";

const RESPONDERS_QUERY_KEY = "responders";
export function useResponders() {
  return useQuery<Responder[], Error>({
    queryKey: [RESPONDERS_QUERY_KEY],
    queryFn: getResponders,
  });
}
