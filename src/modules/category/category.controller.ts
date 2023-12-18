import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CategoryDto } from "./category.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async list() {
    return this.categoryService.findAll();

  }

  @Post('/')
  async create(@Body() body: CategoryDto) {
    return this.categoryService.create(body);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() body: CategoryDto) {
    return this.categoryService.update(id, body);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
