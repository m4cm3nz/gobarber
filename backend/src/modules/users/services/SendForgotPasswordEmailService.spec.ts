import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/email/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokenRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeMailProvider = new FakeMailProvider();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeUserTokensRepository,
            fakeMailProvider,
        );
    });

    it('should be able to recover the password using the email', async () => {
        await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await sendForgotPasswordEmail.execute('johndoe@example.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should no be able to recover a non-existen user password.', async () => {
        await expect(
            sendForgotPasswordEmail.execute('johndoe@example.com'),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate forgot password token when sending forgotten password email', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jonh Doe',
            email: 'johndoe@example.com',
            password: '1234',
        });

        const generate = jest.spyOn(fakeUserTokensRepository, 'generateToken');

        await sendForgotPasswordEmail.execute('johndoe@example.com');

        expect(generate).toHaveBeenCalledWith(user.id);
    });
});
