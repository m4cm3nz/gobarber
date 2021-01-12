import ICreateNotification from '../dtos/ICreateNotification';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
    create(date: ICreateNotification): Promise<Notification>;
}
