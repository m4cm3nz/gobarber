import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hash/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '1234',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    it('should no be able to authenticate with unregistered user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'unregistred-johndoe@example.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should no be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: 'right-password',
        });

        await expect(
            authenticateUser.execute({
                email: 'johndoe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
