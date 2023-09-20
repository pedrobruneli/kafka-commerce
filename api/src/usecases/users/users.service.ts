import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { RegisterDTO } from '../auth/auth.dto';
import { encrypt } from 'src/utils/encryptation.utils';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  public async create(user: RegisterDTO) {
    const encryptedPassword = await encrypt(user.password);
    const newUser = await this.prismaService.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: encryptedPassword,
      },
    });
    return newUser;
  }
}
