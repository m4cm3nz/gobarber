"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const nodemailer_1 = __importDefault(require("nodemailer"));
const tsyringe_1 = require("tsyringe");
const mail_1 = __importDefault(require("@config/mail"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
let EtherealMailProvider = class EtherealMailProvider {
    constructor(mailTemplateProvider) {
        this.mailTemplateProvider = mailTemplateProvider;
        this.client = nodemailer_1.default.createTransport({
            SES: new aws_sdk_1.default.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-1',
            }),
        });
    }
    sendMail({ to, from, subject, templateData, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = mail_1.default.defaults.from;
            yield this.client.sendMail({
                from: {
                    name: (from === null || from === void 0 ? void 0 : from.name) || name,
                    address: (from === null || from === void 0 ? void 0 : from.email) || email,
                },
                to: {
                    name: to.name,
                    address: to.email,
                },
                subject,
                html: yield this.mailTemplateProvider.parse(templateData),
            });
        });
    }
};
EtherealMailProvider = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('MailTemplateProvider')),
    __metadata("design:paramtypes", [Object])
], EtherealMailProvider);
exports.default = EtherealMailProvider;
