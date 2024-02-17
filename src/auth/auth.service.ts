import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private users_service: UsersService,
    private jwt_service: JwtService,
  ) {}

  async signIn({ email, password }: LoginDto): Promise<any> {
    const user = await this.users_service.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }
    const payload = { id: user.id, email: user.email, name: user.name };
    return {
      access_token: await this.jwt_service.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.users_service.findByEmail(registerDto.email);
    console.log(user);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    registerDto.password = await bcryptjs.hash(registerDto.password, 15);
    return this.users_service.create(registerDto);
  }
}
