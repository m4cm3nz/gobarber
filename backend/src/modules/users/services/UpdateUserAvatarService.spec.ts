import FakeStorageProvider from '@shared/container/providers/storage/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('UpdateUserAvatar', () => {
    it('should be able to update the user avatar', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            new FakeStorageProvider(),
        );

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar for a non existent user.', async () => {
        const fakeUsersRepository = new FakeUsersRepository();

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            new FakeStorageProvider(),
        );

        expect(
            updateUserAvatar.execute({
                user_id: 'non-existent-user',
                avatarFileName: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating a new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const updateUserAvatar = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar-1.jpg',
        });

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        await updateUserAvatar.execute({
            user_id: user.id,
            avatarFileName: 'avatar-2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar-1.jpg');
        expect(user.avatar).toBe('avatar-2.jpg');
    });
});
