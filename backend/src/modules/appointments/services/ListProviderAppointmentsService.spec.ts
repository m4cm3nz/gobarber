import FakeCacheProvider from '@shared/container/providers/cache/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvidersAppointments', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppointments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it("should be able to list provider's appoiments on a specific day", async () => {
        const firstAppointment = await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 14, 0, 0),
        });

        const secondAppointment = await fakeAppointmentsRepository.create({
            userId: 'fake-user-id',
            providerId: 'fake-provider-id',
            date: new Date(2021, 0, 10, 15, 0, 0),
        });

        const appointments = await listProviderAppointments.execute({
            provider_id: 'fake-provider-id',
            day: 10,
            month: 1,
            year: 2021,
        });

        expect(appointments).toEqual([firstAppointment, secondAppointment]);
    });
});
