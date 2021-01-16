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
const ProviderDayAvailabilityService_1 = __importDefault(require("@modules/appointments/services/ProviderDayAvailabilityService"));
class ProviderDayAvailabilityController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { provider_id } = request.params;
            const { day, month, year } = request.body;
            const providerDayAvailability = tsyringe_1.container.resolve(ProviderDayAvailabilityService_1.default);
            const availability = yield providerDayAvailability.execute({
                provider_id,
                day,
                month,
                year,
            });
            return response.json(availability);
        });
    }
}
exports.default = ProviderDayAvailabilityController;
