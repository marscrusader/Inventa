import { Router } from 'express'
import CollectionController from '../controllers/collection'
import { checkJwt } from '../middlewares/authentication';

const router = Router()
const collection = new CollectionController()

// Routes from this point onwards requires user to be authenticated
router.use(checkJwt)

// List collections
router.route('/list/:userId').get((req, res, next) => collection.list(req, res, next))

// Create collection
router.route('/create').post((req, res, next) => collection.create(req, res, next))

// Update collection
router.route('/update').post((req, res, next) => collection.update(req, res, next))

// Delete collection
router.route('/delete/:id').delete((req, res, next) => collection.delete(req, res, next))

export default router
