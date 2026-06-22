import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateApplicationDto } from './create-application-dto';
import { UpdateApplicationDto } from './update-application-dto';

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
    try {
      return await this.prisma.application.update({
        where: {
          id: id,
        },
        data: applicationDto,
      });
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException(`Appllication with ${id} not found`);
      }
      throw e;
    }
  }

  async deleteApplication(id: string) {
    try {
      return await this.prisma.application.delete({
        where: {
          id: id,
        },
      });
    } catch (e: any) {
      if (e.code === 'P2025') {
        throw new NotFoundException(`Appllication with ${id} not found`);
      }
      throw e;
    }
  }
}
