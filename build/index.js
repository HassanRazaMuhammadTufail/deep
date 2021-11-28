"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./modules/inventory/routes"));
const db_1 = require("./db/db");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger/swagger"));
require("./crons");
(0, db_1.connect)();
const app = (0, express_1.default)();
// Call midlewares
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
const jsonMiddleware = (0, body_parser_1.json)({ limit: '10mb', inflate: true });
app.use((req, res, next) => {
    jsonMiddleware(req, res, (err) => {
        if (err) {
            console.log(err);
            res.status(400).json({
                status: 400,
                message: 'Invalid JSON or request too large',
            });
        }
        else {
            next();
        }
    });
});
app.use('/', routes_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.listen(
// use port 300 if not defined in environment
// for production port s defined, else 3000 for local development
process.env.PORT ? process.env.PORT : 3000, () => {
    console.log('Listening on requested port');
});
process
    .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', (err) => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});
//# sourceMappingURL=index.js.map