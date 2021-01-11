import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProviderDayAvailabilityService from '@modules/appointments/services/ProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;

        const { day, month, year } = request.body;

        const providerDayAvailability = container.resolve(
            ProviderDayAvailabilityService,
        );

        const availability = await providerDayAvailability.execute({
            provider_id,
            day,
            month,
            year,
        });

        return response.json(availability);
    }
}
