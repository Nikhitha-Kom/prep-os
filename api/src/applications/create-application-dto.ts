import { IsString, IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  company!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsOptional()
  @IsIn(['applied', 'screen', 'tech', 'onsite', 'offer', 'rejected'])
  status!: string;

  @IsOptional()
  @IsIn(['LinkedIn', 'Naukri', 'Cutshort', 'Foundit', 'Referral'])
  source?: string;

  @IsOptional()
  @IsString()
  jdUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateApplicationDto {
  @IsOptional()
  @IsIn(['applied', 'screen', 'tech', 'onsite', 'offer', 'rejected'])
  status!: string;

  @IsOptional()
  @IsIn(['LinkedIn', 'Naukri', 'Cutshort', 'Foundit', 'Referral'])
  source?: string;

  @IsOptional()
  @IsString()
  jdUrl?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
