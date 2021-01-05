import ISendMail from './ISendMail';

export default interface IMailProvider {
    sendMail(data: ISendMail): Promise<void>;
}
