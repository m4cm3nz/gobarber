import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ProviderDayAvailabilityService from './ProviderDayAvailabilityService';

let providerDayAvailabilityService: ProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        providerDayAvailabilityService = new ProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list provider day availability', async () => {
        await fakeAppointmentsRepository.create({
            providerId: 'fake-user-id',
            date: new Date(2021, 0, 10, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            providerId: 'fake-user-id',
            date: new Date(2021, 0, 10, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 0, 10, 11).getTime();
        });

        const availability = await providerDayAvailabilityService.execute({
            provider_id: 'fake-user-id',
            day: 10,
            month: 1,
            year: 2021,
        });

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2021, 0, 10, 8).getTime();
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
            ]),
        );
    });
});
