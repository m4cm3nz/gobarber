import IMailProvider from './IMailProvider';
import ISendMail from './ISendMail';

export default class FakeMailProvider implements IMailProvider {
    private messages: ISendMail[] = [];

    public async sendMail(message: ISendMail): Promise<void> {
        this.messages.push(message);
    }
}
