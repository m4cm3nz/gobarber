"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const celebrate_1 = require("celebrate");
const express_1 = require("express");
const ForgotPasswordController_1 = __importDefault(require("../controllers/ForgotPasswordController"));
const ResetPassordController_1 = __importDefault(require("../controllers/ResetPassordController"));
const passwordRouter = express_1.Router();
const forgotPasswordController = new ForgotPasswordController_1.default();
const resetPasswordController = new ResetPassordController_1.default();
passwordRouter.post('/forgot', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        email: celebrate_1.Joi.string().email().required(),
    },
}), forgotPasswordController.create);
passwordRouter.post('/reset', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        token: celebrate_1.Joi.string().uuid().required(),
        password: celebrate_1.Joi.string().required(),
        password_confirmation: celebrate_1.Joi.string().valid(celebrate_1.Joi.ref('password')),
    },
}), resetPasswordController.create);
exports.default = passwordRouter;
