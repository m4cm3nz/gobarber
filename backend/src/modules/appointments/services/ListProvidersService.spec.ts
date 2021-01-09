import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        listProvidersService = new ListProvidersService(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const anotherUser = await fakeUsersRepository.create({
            name: 'Jonh Tre',
            email: 'johntre@example.com',
            password: '1234',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'Jonh Qua',
            email: 'johnqua@example.com',
            password: '1234',
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user, anotherUser]);
    });
});
