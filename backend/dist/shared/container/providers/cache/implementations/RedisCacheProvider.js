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
const ioredis_1 = __importDefault(require("ioredis"));
const cache_1 = __importDefault(require("@config/cache"));
class RedisCacheProvider {
    constructor() {
        this.client = new ioredis_1.default(cache_1.default.config.redis);
    }
    save(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.set(key, JSON.stringify(value));
        });
    }
    recover(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.get(key);
            if (!data)
                return null;
            return JSON.parse(data);
        });
    }
    invalidate(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
    invalidatePrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.client.keys(`${prefix}:*`);
            const pipeline = this.client.pipeline();
            keys.forEach(key => {
                pipeline.del(key);
            });
            yield pipeline.exec();
        });
    }
}
exports.default = RedisCacheProvider;
