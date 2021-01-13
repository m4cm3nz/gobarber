import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import IStorageProvider from './storage/IStorageProvider';
import DiskStorageProvider from './storage/DiskStorageProvider';
import IMailProvider from './email/IMailProvider';
import EtherealMailProvider from './email/implementations/EtherealMailProvider';
import HandlebarsMailTemplateProvider from './email-template/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './email-template/IMailTemplateProvider';
import SESMailProvider from './email/implementations/SESMailProvider';

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

    mailConfig.driver === 'ethereal'
        ? container.resolve(EtherealMailProvider)
        : container.resolve(SESMailProvider),
);
