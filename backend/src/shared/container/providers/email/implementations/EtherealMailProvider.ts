/* eslint-disable no-console */
import nodeMailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../email-template/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import ISendMail from '../models/ISendMail';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodeMailer.createTestAccount().then(account => {
            const transporter = nodeMailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                    user: account.user,
                    pass: account.pass,
                },
            });

            this.client = transporter;
        });
    }

    public async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const message = await this.client.sendMail({
            from: {
                name: from?.name || 'Equipe GoBarber',
                address: from?.email || 'equipe@gobarber.com',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log(`Message sent: `, message.messageId);
        console.log(`Preview URL: : `, nodeMailer.getTestMessageUrl(message));
    }
}
