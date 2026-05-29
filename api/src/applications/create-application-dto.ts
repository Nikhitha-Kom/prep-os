import { IsString, IsOptional, IsIn } from 'class-validator';

export class ApplicationDto {
  @IsString()
  company!: string;

  @IsString()
  role!: string;

  @IsOptional()
  @IsIn(['applied', 'screen', 'tech', 'onsite', 'offer', 'rejected'])
  status!: string;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  jdUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
