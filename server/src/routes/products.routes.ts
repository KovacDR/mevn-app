import { Router } from 'express';
import controller from '../controller/products.controller';
import multer from '../libs/multer';
const router = Router();

router.route('/')
    .get(controller.getAll)
    .post(multer.single('image'), controller.addProduct);

router.route('/:id')
    .get(controller.getOne)
    .delete(controller.deletePoduct)
    .put(multer.single('image'), controller.updateProduct);

export default router;