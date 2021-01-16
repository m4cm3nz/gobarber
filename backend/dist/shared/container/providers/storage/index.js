"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const upload_1 = __importDefault(require("@config/upload"));
const tsyringe_1 = require("tsyringe");
const DiskStorageProvider_1 = __importDefault(require("./implementations/DiskStorageProvider"));
const S3StorageProvider_1 = __importDefault(require("./implementations/S3StorageProvider"));
const providers = {
    disk: DiskStorageProvider_1.default,
    s3: S3StorageProvider_1.default,
};
tsyringe_1.container.registerSingleton('StorageProvider', providers[upload_1.default.driver]);
