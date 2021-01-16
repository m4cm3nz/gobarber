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
const path_1 = __importDefault(require("path"));
const tsyringe_1 = require("tsyringe");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
let SendForgotPasswordEmailService = class SendForgotPasswordEmailService {
    constructor(usersRepository, userTokensRepository, mailProvider) {
        this.usersRepository = usersRepository;
        this.userTokensRepository = userTokensRepository;
        this.mailProvider = mailProvider;
    }
    execute(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findByEmail(email);
            if (!user)
                throw new AppError_1.default('User does not exists');
            const { token } = yield this.userTokensRepository.generateToken(user.id);
            const forgotPasswordTemplate = path_1.default.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
            yield this.mailProvider.sendMail({
                to: {
                    name: user.name,
                    email: user.email,
                },
                subject: '[GoBarberer] Recuperação de senha',
                templateData: {
                    file: forgotPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
                    },
                },
            });
        });
    }
};
SendForgotPasswordEmailService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UsersRepository')),
    __param(1, tsyringe_1.inject('UserTokensRepository')),
    __param(2, tsyringe_1.inject('MailProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], SendForgotPasswordEmailService);
exports.default = SendForgotPasswordEmailService;
