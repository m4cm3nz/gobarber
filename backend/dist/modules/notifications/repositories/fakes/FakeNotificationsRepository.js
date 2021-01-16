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
const Notification_1 = __importDefault(require("@modules/notifications/infra/typeorm/schemas/Notification"));
class FakeNotificationsRepository {
    constructor() {
        this.notifications = [];
    }
    create({ recipient_id, content, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const notification = Object.assign(Object.assign({}, new Notification_1.default()), { 
                // id: new ObjectID(),
                content,
                recipient_id });
            this.notifications.push(notification);
            return notification;
        });
    }
}
exports.default = FakeNotificationsRepository;
