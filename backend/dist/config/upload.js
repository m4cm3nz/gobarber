"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const tempFolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder: tempFolder,
    multer: {
        storage: multer_1.default.diskStorage({
            destination: tempFolder,
            filename(request, file, callback) {
                const fileHash = crypto_1.default.randomBytes(10).toString('hex');
                const filename = `${fileHash}-${file.originalname}`;
                return callback(null, filename);
            },
        }),
    },
    config: {
        disk: {
            uploadsFolder: path_1.default.resolve(tempFolder, 'uploads'),
            public_url: `${process.env.APP_API_URL}/files`,
        },
        s3: {
            bucket: 'mc-app-gobarber',
            public_url: `https://mc-app-gobarber.s3.amazonaws.com`,
        },
    },
};
