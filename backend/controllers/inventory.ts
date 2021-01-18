import { NextFunction, Request, Response } from "express";
import { CreateInventoryRequest } from "../interfaces/inventory";
import logger from "../logger";
import InventoryModel from "../models/inventory";
import { validateForm } from "../utils/form";
import { BaseController } from "./base";

export default class InventoryController extends BaseController {
  public async list(req: Request, res: Response, next: NextFunction) {
    const collectionId = req.params.collectionId
    console.log(collectionId + ' hello ')
    logger.info(`[LIST_COLLECTION] List collection request received, collection id=${collectionId}`)

    // 1) Validate
    if (!collectionId) {
      logger.error('[LIST_COLLECTION] Collection id is undefined')
      return this.clientError(res)
    }

    // 2) Get list of inventories
    try {
      const inventories = await InventoryModel.findAll({
        where: {
          collectionId
        },
        attributes: ['name', 'description', 'category', 's3ThumbnailId', 'serialNumber', 'status', 'cost', 'salePrice']
      })
      logger.info(`[LIST_COLLECITON] Successfully retrive list of inventories, total of ${inventories.length} inventories`)
      return this.ok(res, inventories.map(inventory => {
        const { id, name, description, category, s3ThumbnailId, serialNumber, status, cost, salePrice } = inventory
        return {
          id,
          name,
          description,
          category,
          s3ThumbnailId,
          serialNumber,
          status,
          cost,
          salePrice
        }
      }))
    } catch (listError) {
      logger.error('[LIST_COLLECTION] Failed to get list of inventories', listError)
      return this.internalServerError(res)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    const { name, description, collectionId, category, s3Id, s3ThumbnailId, serialNumber, status, cost, salePrice }: CreateInventoryRequest = req.body
    logger.info('[CREATE_INVENTORY] Received request to create inventory', req.body)

    // 1) Validate form
    try {
      validateForm({ name, collectionId })
    } catch (formError) {
      logger.error('[CREATE_INVENTORY] Form fields missing', formError)
      return this.clientError(res)
    }

    // 2) Create inventory
    try {
      const inventory = await InventoryModel.create({
        name,
        description,
        collectionId,
        category,
        s3Id,
        s3ThumbnailId,
        serialNumber,
        status,
        cost,
        salePrice
      })
      logger.info('[CREATE_INVENTORY] Successfully created inventory with id=', inventory.id)
    } catch (createError) {
      logger.error('[CREATE_INVENTORY] Failed to create inventory for collectionId=', collectionId)
      return this.internalServerError(res)
    }
    return this.ok(res)
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id
    logger.info('[DELETE_INVENTORY] Received request to delete inventory, id=', id)
    if (!id) {
      logger.error('[DELETE_INVENTORY] Missing inventory id')
      return this.clientError(res)
    }

    try {
      await InventoryModel.destroy({
        where: {
          id
        }
      })
      logger.info('[DELETE_ERROR] Successfully deleted inventory with id=', id)
    } catch (deleteError) {
      logger.error(`[DELETE_ERROR] Failed to delete inventory with id=${id}`, deleteError)
      return this.internalServerError(res)
    }
  }
}
