import IMailProvider from '@shared/container/providers/email/IMailProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (!userExists) throw new AppError('User does not exists');

        await this.userTokensRepository.generateToken(userExists.id);

        this.mailProvider.sendMail(email, 'Pedido de recuperação de senha');
    }
}

export default SendForgotPasswordEmailService;
