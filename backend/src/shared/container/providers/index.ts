import { container } from 'tsyringe';
import IStorageProvider from './storage/IStorageProvider';
import DiskStorageProvider from './storage/DiskStorageProvider';
import IMailProvider from './email/IMailProvider';
import EtherealMailProvider from './email/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    new EtherealMailProvider(),
);
