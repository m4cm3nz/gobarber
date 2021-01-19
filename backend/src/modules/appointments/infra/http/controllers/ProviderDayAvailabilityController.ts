import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProviderDayAvailabilityService from '@modules/appointments/services/ProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;

        const { day, month, year } = request.query;

        const providerDayAvailability = container.resolve(
            ProviderDayAvailabilityService,
        );

        const availability = await providerDayAvailability.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}
