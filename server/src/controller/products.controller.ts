import Product, { IProduct } from '../database/models/products';
import { Response, Request, NextFunction } from 'express';
import path from 'path';
import fs from 'fs-extra';

const controller = {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await Product.find()
            res.json(products);
        } catch (error) {
            next(error);
        }
    },

    async addProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description } = req.body;
            const product = new Product({
                name,
                description,
                imageURL: req.file.path
            });
            await product.save();
            res.json({
                message: 'Product saved!',
                product
            });
        } catch (error) {
            next(error);
        }
    },

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);
            res.json(product);
        } catch (error) {
            next(error);
        }
    },

    async deletePoduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id);
            if (product) {
                fs.unlink(path.resolve(product.imageURL));
                res.json({
                    message: 'Product deleted'
                });
            } else {
                res.json(null);
            }
        } catch (error) {
            next(error);
        }
    },

    async updateProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const uProduct: IProduct = {...req.body};
            const product = await Product.findByIdAndUpdate(id, uProduct);
            res.json({
                message: 'Updated...',
            });
        } catch (error) {
            next(error);
        }
    }

}

export default controller;