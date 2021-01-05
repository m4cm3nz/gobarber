import handlebars from 'handlebars';
import IMailTemplateProvider from './IMailTemplateProvider';
import IParseMailTemplate from './IParseMailTemplate';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        template,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const parseTemplate = handlebars.compile(template);

        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
