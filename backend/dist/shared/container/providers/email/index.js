"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const mail_1 = __importDefault(require("@config/mail"));
const EtherealMailProvider_1 = __importDefault(require("./implementations/EtherealMailProvider"));
const SESMailProvider_1 = __importDefault(require("./implementations/SESMailProvider"));
const providers = {
    ethereal: tsyringe_1.container.resolve(EtherealMailProvider_1.default),
    ses: tsyringe_1.container.resolve(SESMailProvider_1.default),
};
tsyringe_1.container.registerInstance('MailProvider', providers[mail_1.default.driver]);
