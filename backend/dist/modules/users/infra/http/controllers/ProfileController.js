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
const tsyringe_1 = require("tsyringe");
const UpdateProfileService_1 = __importDefault(require("@modules/users/services/UpdateProfileService"));
const ShowProfileService_1 = __importDefault(require("@modules/users/services/ShowProfileService"));
const class_transformer_1 = require("class-transformer");
class ProfileController {
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const showProfile = tsyringe_1.container.resolve(ShowProfileService_1.default);
            const user_id = request.user.id;
            const user = yield showProfile.execute({ user_id });
            return response.json(class_transformer_1.classToClass(user));
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = request.user.id;
            const { name, email, old_password, password, password_confirmation, } = request.body;
            const updateProfile = tsyringe_1.container.resolve(UpdateProfileService_1.default);
            const user = yield updateProfile.execute({
                user_id,
                name,
                email,
                old_password,
                password,
                password_confirmation,
            });
            return response.json(class_transformer_1.classToClass(user));
        });
    }
}
exports.default = ProfileController;
