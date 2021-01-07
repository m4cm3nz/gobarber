import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/hash/IHashProvider';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user)
            throw new AppError(
                'Only authenticated users can change avatar.',
                401,
            );

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists && checkUserExists.id !== user.id)
            throw new AppError('Email address already used', 422);

        if (password && !old_password)
            throw new AppError(
                'You need to inform the old password to set a newone',
            );

        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compare(
                old_password,
                user.password,
            );

            if (!checkOldPassword)
                throw new AppError('Old password does not match');
        }

        if (password)
            user.password = await this.hashProvider.generate(password);

        return this.usersRepository.save({ ...user, name, email });
    }
}

export default UpdateProfileService;
