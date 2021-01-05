import IParseMailTemplate from './IParseMailTemplate';

export default interface IMailTemplateProvider {
    parse(data: IParseMailTemplate): Promise<string>;
}
