import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/hash/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    token: string;
    password: string;
    password_confirmation: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        token,
        password,
        password_confirmation,
    }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (password !== password_confirmation)
            throw new AppError('Password and password confirmation must match');

        if (!userToken) throw new AppError('User token does not exists', 404);

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) throw new AppError('User not found', 404);

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate))
            throw new AppError('Token has expired', 401);

        user.password = await this.hashProvider.generate(password);

        this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
