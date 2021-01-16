"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = require("bcryptjs");
class BCryptHashProvider {
    generate(payload) {
        return bcryptjs_1.hash(payload, 8);
    }
    compare(payload, hashed) {
        return bcryptjs_1.compare(payload, hashed);
    }
}
exports.default = BCryptHashProvider;
