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
const fs_1 = __importDefault(require("fs"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const upload_1 = __importDefault(require("@config/upload"));
const tsyringe_1 = require("tsyringe");
let UpdateUserAvatarService = class UpdateUserAvatarService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    execute({ user_id, avatarFileName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.findById(user_id);
            if (!user)
                throw new AppError_1.default('Only authenticated users can change avatar.', 401);
            if (user.avatar) {
                const userAvatarFilePath = path_1.default.join(upload_1.default.directory, user.avatar);
                const userAvatarFileExists = yield fs_1.default.promises.stat(userAvatarFilePath);
                if (userAvatarFileExists)
                    yield fs_1.default.promises.unlink(userAvatarFilePath);
            }
            user.avatar = avatarFileName;
            yield this.usersRepository.save(user);
            return user;
        });
    }
};
UpdateUserAvatarService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UsersRepository')),
    __metadata("design:paramtypes", [Object])
], UpdateUserAvatarService);
exports.default = UpdateUserAvatarService;
