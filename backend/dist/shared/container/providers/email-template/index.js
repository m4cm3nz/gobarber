"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const HandlebarsMailTemplateProvider_1 = __importDefault(require("./implementations/HandlebarsMailTemplateProvider"));
tsyringe_1.container.registerInstance('MailTemplateProvider', new HandlebarsMailTemplateProvider_1.default());
