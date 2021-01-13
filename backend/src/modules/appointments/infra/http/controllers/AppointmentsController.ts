import { Request, Response } from 'express';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import { container } from 'tsyringe';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { providerId, date } = request.body;

        const userId = request.user.id;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            userId,
            providerId,
            date,
        });

        return response.json(appointment);
    }
}
