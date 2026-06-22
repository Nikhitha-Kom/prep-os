import { CreateApplicationDto } from './create-application-dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class UpdateApplicationDto extends PartialType(
  OmitType(CreateApplicationDto, ['company', 'role'] as const),
) {}
