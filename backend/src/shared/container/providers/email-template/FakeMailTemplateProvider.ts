import IMailTemplateProvider from './IMailTemplateProvider';
import IParseMailTemplate from './IParseMailTemplate';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ file }: IParseMailTemplate): Promise<string> {
        return file;
    }
}

export default FakeMailTemplateProvider;
