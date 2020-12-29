import ICreateAppointment from '../dtos/ICreateAppointment';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
    create(command: ICreateAppointment): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
}
