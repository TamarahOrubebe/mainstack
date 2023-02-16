require("dotenv").config();
const request = require('supertest');
import mongoose from 'mongoose';
import app from '../src/app';
import Product from '../src/products.model';
const { MongoMemoryServer } = require('mongodb-memory-server');

const URL = process.env.MONGO_URL as string;

let mongoServer;

describe('Product controller', () => {
  const product1 = {
    name: 'Product 1',
    price: 10.99,
    description: 'Description for product 1',
    quantity: 1
  };
  const product2 = {
    name: 'Product 2',
    price: 20.99,
    description: 'Description for product 2',
    quantity: 1
  };

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    await Product.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const res = await request(app)
        .post('/products')
        .send(product1);

      expect(res.status).toBe(201);
      expect(res.body.name).toBe(product1.name);
      expect(res.body.price).toBe(product1.price);
      expect(res.body.description).toBe(product1.description);

      const createdProduct = await Product.findById(res.body._id);
      expect(createdProduct).toBeDefined();
      expect(createdProduct?.name).toBe(product1.name);
      expect(createdProduct?.price).toBe(product1.price);
      expect(createdProduct?.description).toBe(product1.description);
    });

    it('should return a 500 status code when failed to create product', async () => {
      const save = jest.spyOn(Product.prototype, 'save').mockImplementationOnce(() => {throw new Error("save failed")});

      const res = await request(app)
        .post('/products')
        .send(product1);

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error');

      save.mockRestore();
    });
  });

  describe('getAllProducts', () => {
    beforeEach(async () => {
      await Product.insertMany([product1, product2]);
    });

    it('should get all products', async () => {
      const res = await request(app)
        .get('/products');

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].name).toBe(product1.name);
      expect(res.body[1].name).toBe(product2.name);
    });

    it('should get the first page of products with limit of 1', async () => {
      const res = await request(app)
        .get('/products')
        .query({ page: 1, limit: 1 });

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].name).toBe(product1.name);
    });

    it('should return a 500 status code when failed to get products', async () => {
      const find = jest.spyOn(Product, 'find').mockImplementation(() => { throw new Error('find failed')});

      const res = await request(app)
        .get('/products');

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error');
      find.mockRestore();
    });
  });

  describe('getProduct', () => {
    let product: mongoose.Document;

    beforeEach(async () => {
      product = await Product.create(product1);
    });

    it('should get a product by ID', async () => {
      const res = await request(app)
        .get(`/products/${product._id}`);

        expect(res.status).toBe(200)
        expect(res.body.name).toBe(product1.name);
        expect(res.body.price).toBe(product1.price);
        expect(res.body.description).toBe(product1.description);
    });

      it('should return a 404 status code when product not found', async () => {
        
        const res = await request(app).get(`/products/${new mongoose.Types.ObjectId()}`);
        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
          
    });

    it('should return a 500 status code when failed to get product', async () => {
      const findById = jest.spyOn(Product, 'findById').mockImplementation(() => { throw new Error('findById failed') });
    

      const res = await request(app)
        .get(`/products/${product._id}`);

      expect(res.status).toBe(500);
      expect(res.body).toHaveProperty('error');

      findById.mockRestore();
    });
  });

  describe('updateProduct', () => {
    let product: mongoose.Document;

    beforeEach(async () => {
      product = await Product.create(product1);
    });

    it('should update a product', async () => {
      const update = {
        name: 'New product name',
        price: 99.99,
        description: 'New product description'
      };

      const res = await request(app)
        .put(`/products/${product._id}`)
        .send(update);

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(update.name);
      expect(res.body.price).toBe(update.price);
      expect(res.body.description).toBe(update.description);

      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct?.name).toBe(update.name);
      expect(updatedProduct?.price).toBe(update.price);
      expect(updatedProduct?.description).toBe(update.description);
    });

    it('should return a 404 status code when product not found', async () => {
      const res = await request(app)
        .put(`/products/${new mongoose.Types.ObjectId()}`)
        .send(product1);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty('error');
    });

  });

    describe('deleteProduct', () => {
        let product: mongoose.Document;

      beforeEach(async () => {
        product = await Product.create(product1);
      });

      it('should delete a product', async () => {
        const res = await request(app)
          .delete(`/products/${product._id}`);

        expect(res.status).toBe(204);

        const deletedProduct = await Product.findById(product._id);
        expect(deletedProduct).toBeNull();
      });

      it('should return a 404 status code when product not found', async () => {
        const res = await request(app)
          .delete(`/products/${new mongoose.Types.ObjectId()}`);

        expect(res.status).toBe(404);
        expect(res.body).toHaveProperty('error');
      });

    })
})