import { Injectable } from '@nestjs/common';
import { CreateCatsResourceDto } from './dto/create-cats-resource.dto';
import { UpdateCatsResourceDto } from './dto/update-cats-resource.dto';

@Injectable()
export class CatsResourceService {
  create(createCatsResourceDto: CreateCatsResourceDto) {
    return 'This action adds a new catsResource';
  }

  findAll() {
    return `This action returns all catsResource`;
  }

  findOne(id: number) {
    return `This action returns a #${id} catsResource`;
  }

  update(id: number, updateCatsResourceDto: UpdateCatsResourceDto) {
    return `This action updates a #${id} catsResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} catsResource`;
  }
}
