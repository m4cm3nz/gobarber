import IMailTemplateProvider from './IMailTemplateProvider';
import IParseMailTemplate from './IParseMailTemplate';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ template }: IParseMailTemplate): Promise<string> {
        return template;
    }
}

export default FakeMailTemplateProvider;
