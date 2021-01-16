import IChacheProvider from '../models/ICacheProvider';

interface ICacheData {
    [key: string]: string;
}

export default class FakeCacheProvider implements IChacheProvider {
    private cache: ICacheData = {};

    public async save(key: string, value: unknown): Promise<void> {
        this.cache[key] = JSON.stringify(value);
    }

    public async recover<T>(key: string): Promise<T | null> {
        const data = this.cache[key];
        if (!data) return null;

        return JSON.parse(data) as T;
    }

    public async invalidate(key: string): Promise<void> {
        delete this.cache[key];
    }

    public async invalidatePrefix(prefix: string): Promise<void> {
        const keys = Object.keys(this.cache).filter(key =>
            key.startsWith(`${prefix}:`),
        );

        keys.forEach(key => delete this.cache[key]);
    }
}
