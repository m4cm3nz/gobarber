import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/hash/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPassword = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeHashProvider,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: 'old-password-1234',
        });

        const { token } = await fakeUserTokensRepository.generateToken(user.id);

        const newPassword = 'new-password-1234';

        const generateHash = jest.spyOn(fakeHashProvider, 'generate');

        await resetPassword.execute({
            token,
            password: newPassword,
            password_confirmation: newPassword,
        });

        const updatedUser = await fakeUsersRepository.findById(user.id);

        expect(updatedUser?.password).toBe(newPassword);
        expect(generateHash).toBeCalledWith(newPassword);
    });

    it('should not be able to reset the password with non-existent token', async () => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '1234',
                password_confirmation: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existent user', async () => {
        const { token } = await fakeUserTokensRepository.generateToken(
            'non-existing-user',
        );

        await expect(
            resetPassword.execute({
                token,
                password: '1234',
                password_confirmation: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password if passed more than 2 hours', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: 'old-password-1234',
        });

        const { token } = await fakeUserTokensRepository.generateToken(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPassword.execute({
                token,
                password: 'new-password-1234',
                password_confirmation: 'new-password-1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
