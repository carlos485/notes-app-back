import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private users_service: UsersService,
    private jwt_service: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.users_service.findByEmail(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwt_service.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.users_service.findByEmail(registerDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    registerDto.password = await bcryptjs.hash(registerDto.password, 15);
    console.log(registerDto);
    return this.users_service.create(registerDto);
  }
}
