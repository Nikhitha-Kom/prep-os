import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './create-application-dto';
import { PrismaService } from 'src/prisma.service';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly service: ApplicationsService,
    private readonly prisma: PrismaService,
  ) {}

  async VerifyApplicationId(id: string) {
    const user = await this.prisma.application.findUnique({
      where: {
        id: id,
      },
    });
    if (!user)
      throw new NotFoundException(
        `User with id ${id} not found in application database`,
      );
  }

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
    this.VerifyApplicationId(id); //should 'await' be added ? why ?
    return this.service.updateApplication(id, applicationDto);
  }

  @Delete('/:id')
  async deleteApplication(@Param('id') id: string) {
    this.VerifyApplicationId(id);
    return this.service.deleteApplication(id);
  }
}
