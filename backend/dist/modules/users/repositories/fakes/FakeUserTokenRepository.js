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
const UserToken_1 = __importDefault(require("@modules/users/infra/typeorm/entities/UserToken"));
const uuid_1 = require("uuid");
class FakeUserTokensRepository {
    constructor() {
        this.userTokens = [];
    }
    generateToken(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userToken = Object.assign(Object.assign({}, new UserToken_1.default()), { id: uuid_1.v4(), token: uuid_1.v4(), user_id, created_at: new Date(), updated_at: new Date() });
            this.userTokens.push(userToken);
            return userToken;
        });
    }
    findByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userTokens.find(userToken => userToken.token === token);
        });
    }
}
exports.default = FakeUserTokensRepository;
