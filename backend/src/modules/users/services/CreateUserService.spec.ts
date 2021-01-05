import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hash/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        createUser = new CreateUserService(
            new FakeUsersRepository(),
            new FakeHashProvider(),
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create new user with an already taken email', async () => {
        await createUser.execute({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        await expect(
            createUser.execute({
                name: 'Jonh Doe',
                email: 'johndoe@example.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
