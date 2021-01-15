import IMailProvider from '../models/IMailProvider';
import ISendMail from '../models/ISendMail';

export default class FakeMailProvider implements IMailProvider {
    private messages: ISendMail[] = [];

    public async sendMail(message: ISendMail): Promise<void> {
        this.messages.push(message);
    }
}
