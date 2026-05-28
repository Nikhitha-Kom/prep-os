import { IsString, IsOptional } from 'class-validator';

export class ApplicationDto {
  @IsString()
  id?: string;

  company!: string;
  role!: string;
  status!: string;

  @IsOptional()
  jdUrl?: string | null;

  @IsOptional()
  notes?: string | null;

  createdAt: string = new Date().toISOString();

  @IsOptional()
  updatedAt?: string;
}
