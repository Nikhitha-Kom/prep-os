import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ApplicationDto } from './application-dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.application.findMany();
  }

  async createApplication(applicationDto: ApplicationDto) {
    console.log('Inside service---');
    const application = await this.prisma.application.create({
      data: applicationDto,
    });
    console.log('appn.---', application);
    return application;
  }
}
