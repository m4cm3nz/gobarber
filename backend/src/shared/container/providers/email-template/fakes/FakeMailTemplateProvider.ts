import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplate from '../models/IParseMailTemplate';

class FakeMailTemplateProvider implements IMailTemplateProvider {
    public async parse({ file }: IParseMailTemplate): Promise<string> {
        return file;
    }
}

export default FakeMailTemplateProvider;
