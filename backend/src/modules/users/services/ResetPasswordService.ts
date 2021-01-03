import AppError from '@shared/errors/AppError';
import { differenceInHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/hash/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UsersTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) throw new AppError('User token does not exists');

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) throw new AppError('User not found');

        const tokenCreatedAt = userToken.created_at;

        if (differenceInHours(Date.now(), tokenCreatedAt) > 2)
            throw new AppError('Token has expired');

        user.password = await this.hashProvider.generate(password);

        this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
