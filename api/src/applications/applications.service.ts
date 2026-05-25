import { Get, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApplicationsService {
    constructor(private prisma : PrismaService){}

    findAll(){
        return this.prisma.application.findMany()
    }
}
