import { useQuery } from "@tanstack/react-query";
import type { ResponseAlert } from "../api/panic-alerts/types";
import { getPanicAlerts } from "../api/panic-alerts";

const PANIC_ALERTS_QUERY_KEY = "panic-alerts";

export function usePanicAlerts() {
  return useQuery<ResponseAlert[], Error>({
    queryKey: [PANIC_ALERTS_QUERY_KEY],
    queryFn: getPanicAlerts,
  });
}
