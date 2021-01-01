import { hash, compare as bcryptCompare } from 'bcryptjs';
import IHashProvider from './IHashProvider';

class BCryptHashProvider implements IHashProvider {
    public generate(payload: string): Promise<string> {
        return hash(payload, 8);
    }

    public compare(payload: string, hashed: string): Promise<boolean> {
        return bcryptCompare(payload, hashed);
    }
}

export default BCryptHashProvider;
