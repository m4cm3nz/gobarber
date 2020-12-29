import ICreateUser from '@modules/users/dtos/ICreateUser';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public create({ name, email, password }: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({
            name,
            email,
            password,
        });

        return this.ormRepository.save(user);
    }

    public findById(id: string): Promise<User | undefined> {
        return this.ormRepository.findOne(id);
    }

    public findByEmail(email: string): Promise<User | undefined> {
        return this.ormRepository.findOne({
            where: { email },
        });
    }

    public save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository;
