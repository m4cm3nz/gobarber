import fs from 'fs';
import handlebars from 'handlebars';
import IMailTemplateProvider from './IMailTemplateProvider';
import IParseMailTemplate from './IParseMailTemplate';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
    public async parse({
        file,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const templateFileContent = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });

        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplateProvider;
