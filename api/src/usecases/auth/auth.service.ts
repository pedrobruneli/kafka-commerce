import { Injectable } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { UsersService } from '../users/users.service';
import { decrypt } from 'src/utils/encryptation.utils';
import { UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from 'src/models/auth.model';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(login: LoginDTO): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(login.email);
    const isPasswordValid = await decrypt(login.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');
    const access_token = await this.generateToken(user);
    return { access_token };
  }

  public async register(register: RegisterDTO): Promise<AuthResponse> {
    const user = await this.userService.create(register);
    const access_token = await this.generateToken(user);
    return { access_token };
  }

  protected async generateToken(userInfo: User): Promise<string> {
    return await this.jwtService.signAsync({ id: userInfo.id });
  }
}
