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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mockConnection_1 = __importDefault(require("../../../tests/mockConnection"));
const routes_1 = __importDefault(require("../routes"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/', routes_1.default);
describe('InventoryController', () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield mockConnection_1.default.create();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mockConnection_1.default.clear();
        yield mockConnection_1.default.close();
    }));
    let expiry = new Date().getTime() + 100000;
    it('GET /:item/quantity - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/food/quantity');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ quantity: 0, validTill: null });
    }));
    it('POST /:item/add - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/food/add').send({ expiry, quantity: 10 });
        expect(response.status).toBe(201);
        expect(response.body).toEqual({});
    }));
    it('POST /:item/add - failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/food/add').send({ expiry });
        expect(response.status).toBe(400);
    }));
    it('GET /:item/quantity - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/food/quantity');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ quantity: 10, validTill: expiry });
    }));
    it('POST /:item/sell - success', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/food/sell').send({ quantity: 10 });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({});
    }));
    it('POST /:item/sell - failure', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).post('/food/sell').send({});
        expect(response.status).toBe(400);
    }));
});
//# sourceMappingURL=controllers.test.js.map