import { container } from 'tsyringe';
import IStorageProvider from './storage/IStorageProvider';
import DiskStorageProvider from './storage/DiskStorageProvider';
import IMailProvider from './email/IMailProvider';
import EtherealMailProvider from './email/EtherealMailProvider';
import HandlebarsMailTemplateProvider from './email-template/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './email-template/IMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    DiskStorageProvider,
);

container.registerInstance<IMailTemplateProvider>(
    'MailTemplateProvider',
    new HandlebarsMailTemplateProvider(),
);

container.registerInstance<IMailProvider>(
    'MailProvider',
    container.resolve(EtherealMailProvider),
);
