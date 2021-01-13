import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeNotificationsRepository = new FakeNotificationsRepository();

        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
        );

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 12).getTime();
        });
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            userId: 'fake-user-Id',
            date: new Date(2021, 0, 10, 13),
            providerId: 'fake-provider-id',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('fake-provider-id');
    });

    it('should not be able to create two appointment on the same time', async () => {
        const appointmentDate = new Date(2021, 0, 10, 13);

        await createAppointment.execute({
            userId: 'fake-user-Id',
            date: appointmentDate,
            providerId: 'fake-provider-id',
        });

        await expect(
            createAppointment.execute({
                userId: 'fake-user-Id',
                date: appointmentDate,
                providerId: 'fake-provider-id',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create appointments on past date', async () => {
        await expect(
            createAppointment.execute({
                userId: 'fake-user-Id',
                providerId: 'fake-provider-id',
                date: new Date(2021, 0, 10, 11),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointmen with the same user as provider', async () => {
        await expect(
            createAppointment.execute({
                userId: 'fake-user-Id',
                providerId: 'fake-user-Id',
                date: new Date(2021, 0, 10, 13),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointmen before 8am and after 5pm ', async () => {
        await expect(
            createAppointment.execute({
                userId: 'fake-user-Id',
                providerId: 'fake-provider-Id',
                date: new Date(2021, 0, 11, 7),
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                userId: 'fake-user-Id',
                providerId: 'fake-provider-Id',
                date: new Date(2021, 0, 11, 18),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
