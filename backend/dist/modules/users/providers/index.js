"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const BCryptHashProvider_1 = __importDefault(require("./hash/BCryptHashProvider"));
tsyringe_1.container.registerSingleton('HashProvider', BCryptHashProvider_1.default);
