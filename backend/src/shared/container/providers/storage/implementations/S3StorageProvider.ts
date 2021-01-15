import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import upload from '@config/upload';
import mime from 'mime';
import IStorageProvider from '../models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: process.env.AWS_DEFAULT_REGION,
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(upload.tmpFolder, file);

        const fileContent = await fs.promises.readFile(originalPath);

        const contentType = mime.getType(originalPath);
        if (!contentType) throw new Error('file not found');

        await this.client
            .putObject({
                Bucket: upload.config.s3.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            })
            .promise();

        await fs.promises.unlink(originalPath);

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: upload.config.s3.bucket,
                Key: file,
            })
            .promise();
    }
}

export default S3StorageProvider;
