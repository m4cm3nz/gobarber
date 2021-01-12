import { getRepository, Raw, Repository } from 'typeorm';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointment';
import IFindAllInDayFromProvider from '@modules/appointments/dtos/IFindAllInDayFromProvider copy';
import IFindAllInMonthFromProvider from '@modules/appointments/dtos/IFindAllInMonthFromProvider';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        return findAppointment;
    }

    public async create({
        userId,
        providerId,
        date,
    }: ICreateAppointment): Promise<Appointment> {
        const appointment = this.ormRepository.create({
            user_id: userId,
            provider_id: providerId,
            date,
        });

        await this.ormRepository.save(appointment);

        return appointment;
    }

    public async findAllInMonthFromProvider({
        provider_id,
        month,
        year,
    }: IFindAllInMonthFromProvider): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');
        return this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });
    }

    public async findAllInDayFromProvider({
        provider_id,
        day,
        month,
        year,
    }: IFindAllInDayFromProvider): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, '0');
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }
}

export default AppointmentsRepository;
