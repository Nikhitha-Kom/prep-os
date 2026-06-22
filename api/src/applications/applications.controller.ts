import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './create-application-dto';
import { UpdateApplicationDto } from './update-application-dto';
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
  async createApplication(@Body() applicationDto: CreateApplicationDto) {
    return this.service.createApplication(applicationDto);
  }

  @Patch('/:id')
  async updateApplication(
    @Param('id') id: string,
    @Body() applicationDto: UpdateApplicationDto,
  ) {
    return this.service.updateApplication(id, applicationDto);
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: string) {
    return this.service.deleteApplication(id);
  }
}
