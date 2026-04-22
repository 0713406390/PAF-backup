import { useCallback, useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";
import type { NotificationItem } from "../types/notification";

export function useNotifications(unreadOnly = true) {
  const [rows, setRows] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await getNotifications(unreadOnly);
      setRows(data);
    } catch {
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [unreadOnly]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { rows, isLoading, refresh };
}
