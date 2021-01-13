import ICreateNotification from '@modules/notifications/dtos/ICreateNotification';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
// import { ObjectID } from 'mongodb';
import INotificationsRepository from '../INotificationsRepository';

class FakeNotificationsRepository implements INotificationsRepository {
    private notifications: Notification[] = [];

    public async create({
        recipient_id,
        content,
    }: ICreateNotification): Promise<Notification> {
        const notification = {
            ...new Notification(),
            // id: new ObjectID(),
            content,
            recipient_id,
        };

        this.notifications.push(notification);

        return notification;
    }
}

export default FakeNotificationsRepository;
