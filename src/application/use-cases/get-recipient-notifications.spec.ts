import { SendNotification } from './send-notification';
import { Notification } from '../entities/notification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { Content } from '@application/entities/content';
import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

describe('Get recipients notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
