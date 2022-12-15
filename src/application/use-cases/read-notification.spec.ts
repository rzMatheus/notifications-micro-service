import { SendNotification } from './send-notification';
import { Notification } from '../entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from '@application/use-cases/read-notification';

describe('Read notification', () => {
  it('should be able o read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    expect(async () => {
      return await readNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
