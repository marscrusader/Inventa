import { NextFunction, Request, Response } from "express";
import { CreateCategoryRequest } from "../interfaces/category";
import logger from "../logger";
import CategoryModel from "../models/category";
import { validateForm } from "../utils/form";
import { BaseController } from "./base";

export default class CategoryController extends BaseController {
  // START - list categories
  public async list(req: Request, res: Response, next: NextFunction) {
    const collectionId = req.params.collectionId
    logger.info('[LIST_CATEGORY] List category initiated for collection id=', collectionId)

    if (!collectionId) {
      logger.error('[LIST_CATEGORY] Collection id param is missing')
      return this.clientError(res)
    }

    try {
      const categories = await CategoryModel.findAll({
        where: {
          collectionId
        },
        attributes: ['name']
      })
      logger.info('[LIST_CATEGORY] Successfully get all categories', categories)
      return this.ok(res, categories.map(category => ({
        name: category.name
      })))
    } catch (listError) {
      logger.error(`[LIST_CATEGORY] Failed to get all categories for collection id=${collectionId}`, listError)
      return this.internalServerError(res)
    }
  }
  // END -list categories

  // START - create category
  public async create(req: Request, res: Response, next: NextFunction) {
    logger.info('[CREATE_CATEGORY] Create category initiated', req.body)
    const { name, collectionId }: CreateCategoryRequest = req.body

    // 1) Validate
    try {
      validateForm({ name, collectionId })
    } catch (formError) {
      logger.error('[CREATE_CATEGORY] Form error', formError)
      return this.clientError(res)
    }

    // 2) Create category
    try {
      const category = await CategoryModel.create({
        name,
        collectionId
      })
      logger.info('[CREATE_CATEGORY] Successfully created category, id=', category.id)
    } catch (createError) {
      logger.error('[CREATE_CATEGORY] Failed to create category', createError)
      return this.internalServerError(res)
    }

    return this.ok(res)
  }
  // END - create category

  // START - delete category
  public async delete(req: Request, res: Response, next: NextFunction) {
    const name = req.params.name
    logger.info(`[DELETE_CATEGORY] Delete category initiated for name=${name}`)

    // 1) Validate
    if (!name) {
      logger.error('[DELETE_CATEGORY] Category name is missing, delete failed')
      return this.clientError(res)
    }

    try {
      await CategoryModel.destroy({
        where: {
          name
        }
      })
      logger.info(`[DELETE_CATEGORY] Successfully deleted category with name=${name}`)
    } catch (deleteError) {
      logger.error(`[DELETE_CATEGORY] Failed to delete category with name=${name}`, deleteError)
    }
    return this.ok(res)
  }
  // END - delete category
}
