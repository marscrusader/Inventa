import { Router } from 'express'
import CategoryController from '../controllers/category'
import { checkJwt } from '../middlewares/authentication';

const router = Router()
const category = new CategoryController()

// Routes from this point onwards requires user to be authenticated
router.use(checkJwt)

// List categories
router.route('/list/:collectionId').get((req, res, next) => category.list(req, res, next))

// Create category
router.route('/create').post((req, res, next) => category.create(req, res, next))

// Delete category
router.route('/delete/:name').delete((req, res, next) => category.delete(req, res, next))

export default router
