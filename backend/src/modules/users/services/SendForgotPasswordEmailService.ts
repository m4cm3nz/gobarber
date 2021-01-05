import IMailProvider from '@shared/container/providers/email/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) throw new AppError('User does not exists');

        const { token } = await this.userTokensRepository.generateToken(
            user.id,
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[GoBarberer] Recuperação de senha',
            templateData: {
                template: 'Olá, {{name}}: {{token}}',
                variables: {
                    name: user.name,
                    token,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
