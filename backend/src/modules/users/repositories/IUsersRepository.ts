import IFindAllProviders from '@modules/appointments/dtos/IFindAllProviders';
import ICreateUser from '../dtos/ICreateUser';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
    create(command: ICreateUser): Promise<User>;
    findAllProviders(data: IFindAllProviders): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
}
