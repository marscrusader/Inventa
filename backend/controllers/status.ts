import { NextFunction, Request, Response } from "express";
import { CreateStatusRequest } from "../interfaces/status";
import logger from "../logger";
import StatusModel from "../models/status";
import { validateForm } from "../utils/form";
import { BaseController } from "./base";

export default class StatusController extends BaseController {
  public async list(req: Request, res: Response, next: NextFunction) {
    const collectionId = req.params.collectionId
    logger.info('[LIST_STATUS] List status initiated for collection id=', collectionId)

    if (!collectionId) {
      logger.error('[LIST_STATUS] Collection id param is missing')
      return this.clientError(res)
    }

    try {
      const status = await StatusModel.findAll({
        where: {
          collectionId
        },
        attributes: ['name']
      })
      logger.info('[LIST_STATUS] Successfully get all status', status)
      return this.ok(res, status.map(status => ({
        name: status.name
      })))
    } catch (listError) {
      logger.error(`[LIST_STATUS] Failed to get all status for collection id=${collectionId}`, listError)
      return this.internalServerError(res)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[CREATE_STATUS] Create status initiated', req.body)
    const { name, collectionId }: CreateStatusRequest = req.body

    // 1) Validate
    try {
      validateForm({ name, collectionId })
    } catch (formError) {
      logger.error('[CREATE_STATUS] Form error', formError)
      return this.clientError(res)
    }

    // 2) Create status
    try {
      const status = await StatusModel.create({
        name,
        collectionId
      })
      logger.info('[CREATE_STATUS] Successfully created status, id=', status.id)
    } catch (createError) {
      logger.error('[CREATE_STATUS] Failed to create status', createError)
      return this.internalServerError(res)
    }

    return this.ok(res)
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const name = req.params.name
    logger.info(`[DELETE_STATUS] Delete status initiated for name=${name}`)

    // 1) Validate
    if (!name) {
      logger.error('[DELETE_STATUS] Status name is missing, delete failed')
      return this.clientError(res)
    }

    try {
      await StatusModel.destroy({
        where: {
          name
        }
      })
      logger.info(`[DELETE_STATUS] Successfully deleted status with name=${name}`)
    } catch (deleteError) {
      logger.error(`[DELETE_STATUS] Failed to delete status with name=${name}`, deleteError)
    }
    return this.ok(res)
  }
}
