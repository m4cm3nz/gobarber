import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
    driver: 's3' | 'disk';
    tmpFolder: string;
    multer: {
        storage: StorageEngine;
    };
    config: {
        disk: {
            uploadsFolder: string;
            public_url: string;
        };
        s3: {
            bucket: string;
            public_url: string;
        };
    };
}

export default {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder: tempFolder,
    multer: {
        storage: multer.diskStorage({
            destination: tempFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;
                return callback(null, filename);
            },
        }),
    },
    config: {
        disk: {
            uploadsFolder: path.resolve(tempFolder, 'uploads'),
            public_url: `${process.env.APP_API_URL}/files`,
        },
        s3: {
            bucket: 'mc-app-gobarber',
            public_url: `https://mc-app-gobarber.s3.amazonaws.com`,
        },
    },
} as IUploadConfig;
