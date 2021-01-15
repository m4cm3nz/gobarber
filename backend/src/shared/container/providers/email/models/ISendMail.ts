import IParseMailTemplate from '../../email-template/models/IParseMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

export default interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}
