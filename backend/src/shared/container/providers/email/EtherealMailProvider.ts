import nodeMailer, { Transporter } from 'nodemailer';
import IMailProvider from './IMailProvider';

// interface IMessage {
//     to: string;
//     body: string;
// }

export default class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor() {
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

    public async sendMail(to: string, body: string): Promise<void> {
        const message = await this.client.sendMail({
            from: 'Equipe GoBarber <equipe@gobarber.com>',
            to,
            subject: 'Recuperação de senha',
            text: body,
        });

        console.log(`Message sent: `, message.messageId);
        console.log(`Preview URL: : `, nodeMailer.getTestMessageUrl(message));
    }
}
