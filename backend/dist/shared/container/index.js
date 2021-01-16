"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("./providers");
const AppointmentsRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));
const UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
const UserTokensRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserTokensRepository"));
const NotificationsRepository_1 = __importDefault(require("@modules/notifications/infra/typeorm/repositories/NotificationsRepository"));
tsyringe_1.container.registerSingleton('AppointmentsRepository', AppointmentsRepository_1.default);
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('UserTokensRepository', UserTokensRepository_1.default);
tsyringe_1.container.registerSingleton('NotificationsRepository', NotificationsRepository_1.default);
