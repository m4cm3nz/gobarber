import { getDate, getDaysInMonth, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}

type Response = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ProviderMonthAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
    }: IRequest): Promise<Response> {
        const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
            {
                provider_id,
                month,
                year,
            },
        );

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );

        const currentDate = new Date();

        const availability = eachDayArray.map(day => {
            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day;
            });

            const compareDate = new Date(year, month - 1, day, 16, 59, 59);

            return {
                day,
                available:
                    appointmentsInDay.length < 10 &&
                    isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default ProviderMonthAvailabilityService;
