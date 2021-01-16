"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const upload_1 = __importDefault(require("@config/upload"));
const mime_1 = __importDefault(require("mime"));
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.default.S3({
            region: process.env.AWS_DEFAULT_REGION,
        });
    }
    saveFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const originalPath = path_1.default.resolve(upload_1.default.tmpFolder, file);
            const fileContent = yield fs_1.default.promises.readFile(originalPath);
            const contentType = mime_1.default.getType(originalPath);
            if (!contentType)
                throw new Error('file not found');
            yield this.client
                .putObject({
                Bucket: upload_1.default.config.s3.bucket,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: contentType,
            })
                .promise();
            yield fs_1.default.promises.unlink(originalPath);
            return file;
        });
    }
    deleteFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .deleteObject({
                Bucket: upload_1.default.config.s3.bucket,
                Key: file,
            })
                .promise();
        });
    }
}
exports.default = S3StorageProvider;
