import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IChacheProvider from '@shared/container/providers/cache/models/ICacheProvider';
import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('CacheProvider')
        private cacheProvider: IChacheProvider,
    ) {}

    public async execute({ user_id }: IRequest): Promise<User[]> {
        // let users = await this.cacheProvider.recover<User[]>(
        //     `providers-list:${user_id}`,
        // );
        let users;
        if (!users) {
            users = await this.usersRepository.findAllProviders({
                except_user_id: user_id,
            });

            await this.cacheProvider.save(
                `providers-list:${user_id}`,
                classToClass(users),
            );
        }

        return users;
    }
}

export default ListProvidersService;
