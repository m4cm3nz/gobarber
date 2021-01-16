"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const celebrate_1 = require("celebrate");
const upload_1 = __importDefault(require("@config/upload"));
const ensureAuthenticated_1 = __importDefault(require("@shared/infra/http/middlewares/ensureAuthenticated"));
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
const usersRouter = express_1.Router();
const upload = multer_1.default(upload_1.default.multer);
const usersController = new UsersController_1.default();
const userAvatarController = new UserAvatarController_1.default();
usersRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
}), usersController.create);
usersRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), userAvatarController.update);
exports.default = usersRouter;
