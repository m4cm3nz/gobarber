import { container } from 'tsyringe';
import BCryptHashProvider from './hash/BCryptHashProvider';
import IHashProvider from './hash/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
