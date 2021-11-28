"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInventory = exports.sellInventory = exports.addInventory = void 0;
const inventoryService = __importStar(require("../services/services"));
const schemas_1 = require("../spec/schemas");
const addInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value: paramValue, error: paramError } = schemas_1.paramSchema.validate(req.params);
        const { value, error } = schemas_1.addBodySchema.validate(req.body);
        if (paramError || error) {
            return res.status(400).json({
                status: 400,
                message: paramError ? paramError.message : error.message,
            });
        }
        const data = Object.assign(Object.assign({}, paramValue), value);
        yield inventoryService.addInventory(data);
        return res.status(201).json({});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
});
exports.addInventory = addInventory;
const sellInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value: paramValue, error: paramError } = schemas_1.paramSchema.validate(req.params);
        const { value, error } = schemas_1.sellBodySchema.validate(req.body);
        if (paramError || error) {
            return res.status(400).json({
                status: 400,
                message: paramError ? paramError.message : error.message,
            });
        }
        const { item } = paramValue;
        const { quantity } = value;
        yield inventoryService.sellInventory(item, quantity);
        return res.status(200).json({});
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
});
exports.sellInventory = sellInventory;
const getInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { value, error } = schemas_1.paramSchema.validate(req.params);
        if (error) {
            return res.status(400).json({ status: 400, message: error.message });
        }
        const { item } = value;
        const inventory = yield inventoryService.getInventory(item);
        return res.status(200).json(inventory);
    }
    catch (error) {
        return res.status(400).json({ status: 400, message: error.message });
    }
});
exports.getInventory = getInventory;
//# sourceMappingURL=controllers.js.map