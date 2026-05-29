import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationDto } from './create-application-dto';
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
  async createApplication(@Body() applicationDto: ApplicationDto) {
    return this.service.createApplication(applicationDto);
  }
}
