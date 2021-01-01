"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("express-async-errors");
const upload_1 = __importDefault(require("@config/upload"));
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const routes_1 = __importDefault(require("./routes"));
require("@shared/infra/typeorm");
require("@shared/container");
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.directory));
app.use(routes_1.default);
app.use((err, request, response, _) => {
    if (err instanceof AppError_1.default)
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    console.log(err);
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('🐱‍🏍Server started on port 3333!');
});
