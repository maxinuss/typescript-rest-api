import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from "../../../src/modules/category/category.service";
import { Category } from "../../../src/modules/category/category.entity";
import { CategoryDto } from "../../../src/modules/category/category.dto";
import { LogService } from "../../../src/common/services/log.service";


describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        LogService,
        {
          provide: getRepositoryToken(Category),
          useClass: Repository,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(getRepositoryToken(Category));
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      const mockCategories: Category[] = [{ id: '1', name: 'Category 1' } as Category];
      jest.spyOn(categoryRepository, 'find').mockResolvedValue(mockCategories);

      const result = await categoryService.findAll();

      expect(result).toEqual(mockCategories);
    });
  });

  describe('create', () => {
    it('should create a new category', async () => {
      const categoryDto: CategoryDto = { name: 'New Category', image: 'https://image.com', description: 'description' };
      const createdCategory: Category = { id: '1', name: 'New Category' } as Category;

      jest.spyOn(categoryRepository, 'create').mockReturnValue(categoryDto as any);
      jest.spyOn(categoryRepository, 'save').mockResolvedValue(createdCategory);

      const result = await categoryService.create(categoryDto);

      expect(result).toEqual(createdCategory);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = '1';
      const categoryDto: CategoryDto = { name: 'Updated Category', image: 'https://image.com', description: 'description' };

      const existingCategory: Category = { id: categoryId, name: 'Old Category' } as Category;
      const updatedCategory: Category = { id: categoryId, name: 'Updated Category' } as Category;

      jest.spyOn(categoryRepository, 'preload').mockResolvedValue(existingCategory);
      jest.spyOn(categoryRepository, 'save').mockResolvedValue(updatedCategory);

      const result = await categoryService.update(categoryId, categoryDto);

      expect(result).toEqual(updatedCategory);
    });

    it('should return null if the category to update is not found', async () => {
      const categoryId = '1';
      const categoryDto: CategoryDto = { name: 'Updated Category', image: 'https://image.com', description: 'description' };

      jest.spyOn(categoryRepository, 'preload').mockResolvedValue(null);

      const result = await categoryService.update(categoryId, categoryDto);

      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should return a category by ID', async () => {
      const categoryId = '1';
      const foundCategory: Category = { id: categoryId, name: 'Found Category' } as Category;

      jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValue(foundCategory);

      const result = await categoryService.findOne(categoryId);

      expect(result).toEqual(foundCategory);
    });

    it('should return null if the category is not found', async () => {
      const categoryId = '1';

      jest.spyOn(categoryRepository, 'findOneBy').mockResolvedValue(null);

      const result = await categoryService.findOne(categoryId);

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a category by ID', async () => {
      const categoryId = '1';
      const deleteResult = { raw: [], affected: 1 };

      jest.spyOn(categoryRepository, 'delete').mockResolvedValue(deleteResult);

      const result = await categoryService.delete(categoryId);

      expect(result).toEqual(deleteResult);
    });
  });

});
