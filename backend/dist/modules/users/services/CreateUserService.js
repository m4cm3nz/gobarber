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
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const tsyringe_1 = require("tsyringe");
let CreateUserService = class CreateUserService {
    constructor(usersRepository, hashProvider, cacheProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.cacheProvider = cacheProvider;
    }
    execute({ name, email, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUserExists = yield this.usersRepository.findByEmail(email);
            if (checkUserExists)
                throw new AppError_1.default('Email address already used', 422);
            const hashedPassword = yield this.hashProvider.generate(password);
            const user = yield this.usersRepository.create({
                name,
                email,
                password: hashedPassword,
            });
            yield this.cacheProvider.invalidatePrefix('providers-list');
            return user;
        });
    }
};
CreateUserService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UsersRepository')),
    __param(1, tsyringe_1.inject('HashProvider')),
    __param(2, tsyringe_1.inject('CacheProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateUserService);
exports.default = CreateUserService;
