import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { isEqual } from 'date-fns';
import { v4 as uuid } from 'uuid';

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        return this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );
    }

    public async create({
        providerId,
        date,
    }: ICreateAppointment): Promise<Appointment> {
        const appointment = {
            ...new Appointment(),
            id: uuid(),
            date,
            provider_id: providerId,
        };

        this.appointments.push(appointment);
        return appointment;
    }
}

export default FakeAppointmentsRepository;
