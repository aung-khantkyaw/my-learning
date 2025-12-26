import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CatsResourceService } from './cats-resource.service';
import { CreateCatsResourceDto } from './dto/create-cats-resource.dto';
import { UpdateCatsResourceDto } from './dto/update-cats-resource.dto';

@Controller('cats-resource')
export class CatsResourceController {
  constructor(private readonly catsResourceService: CatsResourceService) {}

  @Post()
  create(@Body() createCatsResourceDto: CreateCatsResourceDto) {
    return this.catsResourceService.create(createCatsResourceDto);
  }

  @Get()
  findAll() {
    return this.catsResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsResourceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatsResourceDto: UpdateCatsResourceDto,
  ) {
    return this.catsResourceService.update(+id, updateCatsResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsResourceService.remove(+id);
  }
}
