import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from "./product.service";
import { ProductDto } from "./product.dto";

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) { }

  @Get('/')
  list() {
    return this.productService.findAll();
  }


  @Post('/')
  async create(@Body() body: ProductDto) {
    return this.productService.create(body);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: ProductDto) {
    return this.productService.update(id, body);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
