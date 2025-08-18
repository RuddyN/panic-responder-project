import { useMutation, useQuery } from "@tanstack/react-query";
import type { PanicAlertDetails, PanicAlert } from "../api/panic-alerts/types";
import {
  getPanicAlertDetails,
  getPanicAlerts,
  updatePanicAlert,
} from "../api/panic-alerts";

const PANIC_ALERTS_QUERY_KEY = "panic-alerts";
const PANIC_ALERT_DETAILS_QUERY_KEY = "panic-alert-details";

export function usePanicAlerts() {
  return useQuery<PanicAlert[], Error>({
    queryKey: [PANIC_ALERTS_QUERY_KEY],
    queryFn: getPanicAlerts,
  });
}

export function usePanicAlertDetails(id: number) {
  return useQuery<PanicAlertDetails, Error>({
    queryKey: [PANIC_ALERT_DETAILS_QUERY_KEY, id],
    queryFn: () => getPanicAlertDetails(id),
    enabled: !!id,
  });
}

export const useUpdatePanicAlert = () =>
  useMutation<PanicAlert, Error, PanicAlert>({
    mutationFn: (body: PanicAlert) => updatePanicAlert(body),
  });
