import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            userId: 'fake-user-Id',
            date: new Date(),
            providerId: '1',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            userId: 'fake-user-Id',
            date: appointmentDate,
            providerId: '1',
        });

        await expect(
            createAppointment.execute({
                userId: 'fake-user-Id',
                date: appointmentDate,
                providerId: '1',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
