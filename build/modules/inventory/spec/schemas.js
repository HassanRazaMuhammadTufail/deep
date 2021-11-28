"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellBodySchema = exports.addBodySchema = exports.paramSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.paramSchema = joi_1.default.object()
    .keys({
    item: joi_1.default.string().required(),
})
    .options({ allowUnknown: false });
exports.addBodySchema = joi_1.default.object()
    .keys({
    quantity: joi_1.default.number().required(),
    expiry: joi_1.default.number().required(),
})
    .options({ allowUnknown: false });
exports.sellBodySchema = joi_1.default.object()
    .keys({
    quantity: joi_1.default.number().required(),
})
    .options({ allowUnknown: false });
//# sourceMappingURL=schemas.js.map