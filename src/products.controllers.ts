import { Request, Response } from 'express';
import Product from './products.model';

interface MyProduct {
    addProduct: (param1: Request, param2: Response) => void;
    getAllProducts: (param1: Request, param2: Response) => void;
    getProduct: (param1: Request, param2: Response) => void;
    updateProduct: (param1: Request, param2: Response) => void;
    deleteProduct: (param1: Request, param2: Response) => void;
}

class Products implements MyProduct{
    // Add a new product
     async addProduct(req: Request, res: Response) {
        try {
            const { name, price, description, quantity } = req.body;

            const product = new Product({ name, price, description, quantity });
            await product.save();

            return res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to create product' });
        }
    }

    //Get all products
    async getAllProducts(req: Request, res: Response) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const products = await Product.find()
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();

           return res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to get products' });
        }
    }
    //Get a single Product
    async getProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const product = await Product.findById(id).exec();

            if (!product) {
            return res.status(404).json({ error: 'Product not found' });
            }

           return  res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to get product' });
        }
    }
    // Update a product
    async updateProduct(req: Request, res: Response) {
       try {
            const { id } = req.params;
            const { name, price, description, quantity } = req.body;

            const product = await Product.findByIdAndUpdate(
            id,
            { name, price, description, quantity },
            { new: true }
            ).exec();

            if (!product) {
            return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to update product' });
        }
    }

    // Delete a product
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id).exec();

            if (!product) {
            return res.status(404).json({ error: 'Product not found' });
            }

            return res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }

}

const productsControllers: MyProduct = new Products();
export default productsControllers;

