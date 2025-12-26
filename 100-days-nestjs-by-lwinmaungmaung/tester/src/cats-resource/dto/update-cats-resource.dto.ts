import { PartialType } from '@nestjs/mapped-types';
import { CreateCatsResourceDto } from './create-cats-resource.dto';

export class UpdateCatsResourceDto extends PartialType(CreateCatsResourceDto) {}
