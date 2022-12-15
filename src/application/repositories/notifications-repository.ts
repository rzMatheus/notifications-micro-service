import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;

  abstract countManyByRecipientId(recipientId: string): Promise<number>;

  abstract findById(notificationId: string): Promise<Notification | null>;

  abstract create(notification: Notification): Promise<void>;

  abstract save(notification: Notification): Promise<void>;
}
