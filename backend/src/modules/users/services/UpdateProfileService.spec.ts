import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hash/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        updateProfile = new UpdateProfileService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to update the user profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
        });

        expect(updatedUser.name).toBe('Jonh Mac Doe');
        expect(updatedUser.email).toBe('johnmacdoe@example.com');
    });

    it('should be able to update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'Jonh Mac Doe',
            email: 'johnmacdoe@example.com',
            old_password: '1234',
            password: '123456',
        });

        expect(updatedUser.password).toBe('123456');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Jonh Mac Doe',
                email: 'johnmacdoe@example.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Jonh Mac Doe',
                email: 'johnmacdoe@example.com',
                old_password: 'incorret-password',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update avatar for a non existent user.', async () => {
        await expect(
            updateProfile.execute({
                user_id: 'non-existent-user-id',
                name: 'Jonh Mac Doe',
                email: 'johnmacdoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the profile with an already taken email', async () => {
        await fakeUsersRepository.create({
            name: 'Jonh',
            email: 'john@example.com',
            password: '1234',
        });

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'Jonh Mac Doe',
                email: 'john@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
