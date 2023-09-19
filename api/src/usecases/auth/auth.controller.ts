import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Body } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { Public } from 'src/utils/metadata.utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }
}
