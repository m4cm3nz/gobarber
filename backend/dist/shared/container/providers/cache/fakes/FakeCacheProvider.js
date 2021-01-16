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
Object.defineProperty(exports, "__esModule", { value: true });
class FakeCacheProvider {
    constructor() {
        this.cache = {};
    }
    save(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cache[key] = JSON.stringify(value);
        });
    }
    recover(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = this.cache[key];
            if (!data)
                return null;
            return JSON.parse(data);
        });
    }
    invalidate(key) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.cache[key];
        });
    }
    invalidatePrefix(prefix) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = Object.keys(this.cache).filter(key => key.startsWith(`${prefix}:`));
            keys.forEach(key => delete this.cache[key]);
        });
    }
}
exports.default = FakeCacheProvider;
