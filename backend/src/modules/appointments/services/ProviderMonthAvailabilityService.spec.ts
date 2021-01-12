import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ProviderMonthAvailabilityService from './ProviderMonthAvailabilityService';

let providerMonthAvailabilityService: ProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ProviderMonthAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        providerMonthAvailabilityService = new ProviderMonthAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list provider month availability', async () => {
        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 9, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 11, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 12, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 13, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 15, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 16, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 9, 17, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 9, 0, 0),
        });

        const availability = await providerMonthAvailabilityService.execute({
            provider_id: 'fake-provider-id',
            month: 1,
            year: 2021,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 8, available: true },
                { day: 9, available: false },
                { day: 10, available: true },
                { day: 11, available: true },
            ]),
        );
    });
});
