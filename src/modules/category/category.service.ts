import { Injectable } from '@nestjs/common';
import { CategoryDto } from "./category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./category.entity";
import { Repository } from "typeorm";
import { LogService } from "../../common/services/log.service";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly log: LogService,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      return this.categoryRepository.find();
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async create(categoryDto: CategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create(categoryDto);

      return this.categoryRepository.save(category);
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async update(id: string, categoryDto: CategoryDto): Promise<Category|null> {
    try {
      const category = await this.categoryRepository.preload({ id, ...categoryDto });
      if (!category) return null;

      return await this.categoryRepository.save(category);
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async findOne(id: string): Promise<Category|null> {
    try {
      return this.categoryRepository.findOneBy({ id });
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async delete(id: string) {
    try {
      return this.categoryRepository.delete(id);
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }
}
