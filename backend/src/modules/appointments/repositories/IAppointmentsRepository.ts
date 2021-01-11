import ICreateAppointment from '../dtos/ICreateAppointment';
import IFindAllInDayFromProvider from '../dtos/IFindAllInDayFromProvider copy';
import IFindAllInMonthFromProvider from '../dtos/IFindAllInMonthFromProvider';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
    create(command: ICreateAppointment): Promise<Appointment>;

    findByDate(date: Date): Promise<Appointment | undefined>;

    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProvider,
    ): Promise<Appointment[]>;

    findAllInDayFromProvider(
        data: IFindAllInDayFromProvider,
    ): Promise<Appointment[]>;
}
