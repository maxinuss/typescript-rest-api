import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from "../../../src/modules/product/product.service";
import { Product } from "../../../src/modules/product/product.entity";
import { ProductDto } from "../../../src/modules/product/product.dto";
import { LogService } from "../../../src/common/services/log.service";


describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        LogService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    productRepository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const mockProducts: Product[] = [{
        id: '1',
        name: 'Product 1',
        image: 'https://google.com',
        price: 20.0,
        category: {
          id: '1',
          name: 'Something',
          image: '',
          created: new Date(),
          updated: new Date(),
          description: '',
          products: [new Product()]
        },
        categoryId: '1',
        description: '',
        updated: new Date(),
        created: new Date(),
      } as Product];
      jest.spyOn(productRepository, 'find').mockResolvedValue(mockProducts);

      const result = await productService.findAll();

      expect(result).toEqual(mockProducts);
    });
  });

  describe('create', () => {
    it('should create a new product', async () => {
      const productDto: ProductDto = {
        name: 'New Product',
        image: 'https://image.com',
        description: 'description',
        price: 1,
        categoryId: '1',
      };
      const createdProduct: Product = { id: '1', name: 'New Product' } as Product;

      jest.spyOn(productRepository, 'create').mockReturnValue(ProductDto as any);
      jest.spyOn(productRepository, 'save').mockResolvedValue(createdProduct);

      const result = await productService.create(productDto);

      expect(result).toEqual(createdProduct);
    });
  });

  describe('create should fails', () => {
    it('should create a new product and fail', async () => {
      const productDto: ProductDto = {
        name: 'New Product',
        image: 'https://image.com',
        description: 'description',
        price: 1,
        categoryId: '1',
      };

      jest.spyOn(productRepository, 'create').mockReturnValue(new Product());
      const logErrorSpy = jest.spyOn(productService['log'], 'error');

      await productService.create(productDto);
      expect(logErrorSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const productId = '1';
      const productDto: ProductDto = {
        name: 'Updated Product',
        image: 'https://image.com',
        description: 'description',
        price: 1,
        categoryId: '1',
      };

      const existingProduct: Product = { id: productId, name: 'Old Product' } as Product;
      const updatedProduct: Product = { id: productId, name: 'Updated Product' } as Product;

      jest.spyOn(productRepository, 'preload').mockResolvedValue(existingProduct);
      jest.spyOn(productRepository, 'save').mockResolvedValue(updatedProduct);

      const result = await productService.update(productId, productDto);

      expect(result).toEqual(updatedProduct);
    });

    it('should return null if the product to update is not found', async () => {
      const productId = '1';
      const productDto: ProductDto = {
        name: 'Updated Product',
        image: 'https://image.com',
        description: 'description',
        price: 1,
        categoryId: '1',
      };

      jest.spyOn(productRepository, 'preload').mockResolvedValue(null);

      const result = await productService.update(productId, productDto);

      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', async () => {
      const productId = '1';
      const foundProduct: Product = { id: productId, name: 'Found Product' } as Product;

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(foundProduct);

      const result = await productService.findOne(productId);

      expect(result).toEqual(foundProduct);
    });

    it('should return null if the product is not found', async () => {
      const productId = '1';

      jest.spyOn(productRepository, 'findOneBy').mockResolvedValue(null);

      const result = await productService.findOne(productId);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a product by ID', async () => {
      const productId = '1';
      const deleteResult = { raw: [], affected: 1 };

      jest.spyOn(productRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await productService.delete(productId);

      expect(result).toEqual(deleteResult);
    });
  });

});
