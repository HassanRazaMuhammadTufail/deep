import { Request, Response } from 'express';
import * as inventoryService from '../services/services';
import { addBodySchema, paramSchema, sellBodySchema } from '../spec/schemas';

export const addInventory = async (req: Request, res: Response): Promise<{ [key: string]: string | any }> => {
  try {
    const { value: paramValue, error: paramError } = paramSchema.validate(req.params);
    const { value, error } = addBodySchema.validate(req.body);
    if (paramError || error) {
      return res.status(400).json({
        status: 400,
        message: paramError ? paramError.message : error.message,
      });
    }
    const data = {
      ...paramValue,
      ...value,
    };
    await inventoryService.addInventory(data);
    return res.status(201).json({});
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

export const sellInventory = async (req: Request, res: Response): Promise<{ [key: string]: string | any }> => {
  try {
    const { value: paramValue, error: paramError } = paramSchema.validate(req.params);
    const { value, error } = sellBodySchema.validate(req.body);
    if (paramError || error) {
      return res.status(400).json({
        status: 400,
        message: paramError ? paramError.message : error.message,
      });
    }
    const { item } = paramValue;
    const { quantity } = value;
    await inventoryService.sellInventory(item, quantity);
    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

export const getInventory = async (req: Request, res: Response): Promise<{ [key: string]: string | any }> => {
  try {
    const { value, error } = paramSchema.validate(req.params);
    if (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
    const { item } = value;
    const inventory = await inventoryService.getInventory(item);
    return res.status(200).json(inventory);
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
