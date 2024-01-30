import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private user_repository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<any> {
    return await this.user_repository.findOneBy({ email });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    return await this.user_repository.save(registerDto);
  }
}
