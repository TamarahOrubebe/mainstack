import express, {Router} from 'express';
import productsControllers from './products.controllers';
const productsRouter: Router = express.Router();

// Create a product
  productsRouter.post('/', productsControllers.addProduct);

  // Get all products
  productsRouter.get('/', productsControllers.getAllProducts);

  // Get a single product
  productsRouter.get('/:id', productsControllers.getProduct);

  // Update a product
  productsRouter.put('/:id', productsControllers.updateProduct);

  // Delete a product
  productsRouter.delete('/:id', productsControllers.deleteProduct);

export default productsRouter;