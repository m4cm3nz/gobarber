import { container } from 'tsyringe';
import IStorageProvider from './storage/IStorageProvider';
import DiskStorageProvider from './storage/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);
