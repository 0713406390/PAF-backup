export type NotificationType = "BOOKING_DECISION" | "TICKET_STATUS_CHANGED" | "TECHNICIAN_ASSIGNED";

export interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
  entityType: string;
  entityId: number;
  read: boolean;
  createdAt: string;
}
