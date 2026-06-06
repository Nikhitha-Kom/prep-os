import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  CreateApplicationDto,
  UpdateApplicationDto,
} from './create-application-dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.application.findMany();
  }

  async createApplication(applicationDto: CreateApplicationDto) {
    const application = await this.prisma.application.create({
      data: applicationDto,
    });
    return application;
  }

  async updateApplication(id: string, applicationDto: UpdateApplicationDto) {
    const updatedApplication = await this.prisma.application.update({
      where: {
        id: id,
      },
      data: applicationDto,
    });
    return updatedApplication;
  }

  async deleteApplication(id: string) {
    const deletedApplication = await this.prisma.application.delete({
      where: {
        id: id,
      },
    });
    return deletedApplication;
  }
}
