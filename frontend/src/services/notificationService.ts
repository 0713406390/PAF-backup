import client from "../api/client";
import type { NotificationItem } from "../types/notification";

export async function getNotifications(unreadOnly = true): Promise<NotificationItem[]> {
  const response = await client.get<NotificationItem[]>("/notifications", {
    params: { unreadOnly },
  });
  return response.data;
}
