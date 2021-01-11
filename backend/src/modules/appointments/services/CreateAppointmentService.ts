import { getHours, isBefore, startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    userId: string;
    providerId: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        userId,
        providerId,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now()))
            throw new AppError(
                "You can't create an appointment on a past date",
            );

        if (userId === providerId)
            throw new AppError("You can't create an appoimento to your self");

        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
            throw new AppError(
                'You can only create appointment beteween 8am and 5pm',
            );

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate)
            throw new AppError('This appointment is already booked', 422);

        const appointment = await this.appointmentsRepository.create({
            userId,
            providerId,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
