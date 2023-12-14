import { Injectable } from "@nestjs/common";
import { Product } from "./product.entity";
import { ProductDto } from "./product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LogService } from "../../common/services/log.service";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly log: LogService,
  ) { }

  async findAll(): Promise<Product[]> {
    try {
      return this.productRepository.find({ relations: ['category']});
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async create(productDto: ProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(productDto);

      return this.productRepository.save(product);
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async update(id: string, productDto: ProductDto): Promise<Product|null> {
    try {
      const product = await this.productRepository.preload({ id, ...productDto });
      if (!product) return null;

      return await this.productRepository.save(product);
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async findOne(id: string): Promise<Product|null> {
    try {
      return this.productRepository.findOneBy({ id });
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }

  async delete(id: string) {
    try {
      return this.productRepository.delete(id);
    } catch (error: any) {
      this.log.error(error).then();

      return error?.response;
    }
  }
}
