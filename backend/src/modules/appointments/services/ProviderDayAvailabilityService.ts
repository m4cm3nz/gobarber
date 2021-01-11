import { getHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}

type Response = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        month,
        year,
        day,
    }: IRequest): Promise<Response> {
        const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
            {
                provider_id,
                day,
                month,
                year,
            },
        );

        const hourStart = 8;

        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => index + hourStart,
        );

        const dateTimeNow = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hasAppointmentsInHours = appointments.find(appointment => {
                return getHours(appointment.date) === hour;
            });

            const currentDateTime = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    !hasAppointmentsInHours &&
                    isAfter(currentDateTime, dateTimeNow),
            };
        });

        return availability;
    }
}

export default ProviderDayAvailabilityService;
