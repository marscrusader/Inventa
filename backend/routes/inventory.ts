import { Router } from 'express'
import InventoryController from '../controllers/inventory'
import { checkJwt } from '../middlewares/authentication';

const router = Router()
const inventory = new InventoryController()

// Routes from this point onwards requires user to be authenticated
router.use(checkJwt)

// List inventory
router.route('/list/:collectionId').get((req, res, next) => inventory.list(req, res, next))

// Find inventory
router.route('/find/:id').get((req, res, next) => inventory.find(req, res, next))

// Create inventory
router.route('/create').post((req, res, next) => inventory.create(req, res, next))

// Update inventory
router.route('/update').put((req, res, next) => inventory.update(req, res, next))

// Delete inventory
router.route('/delete/:id').delete((req, res, next) => inventory.delete(req, res, next))

export default router
