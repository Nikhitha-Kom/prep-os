import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationDto } from './application-dto';
import { PrismaService } from 'src/prisma.service';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly service: ApplicationsService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  async addApplication(@Body() applicationDto: ApplicationDto) {
    console.log('Inside controller---');
    return this.service.createApplication(applicationDto);
  }
}
