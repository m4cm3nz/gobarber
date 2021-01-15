import { container } from 'tsyringe';

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from './models/IMailTemplateProvider';

container.registerInstance<IMailTemplateProvider>(
    'MailTemplateProvider',
    new HandlebarsMailTemplateProvider(),
);
