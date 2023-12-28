import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { UsersService } from 'src/users/users.service';
import { error } from 'console';

@Injectable()
export class NotebooksService {
  constructor(
    @InjectRepository(Notebook)
    private notebook_repository: Repository<Notebook>,
    private users_service: UsersService,
  ) {}

  async create(createNotebookDto: CreateNotebookDto, email: string) {
    try {
      const user = await this.users_service.findByEmail(email);
      createNotebookDto.user = user;
      const notebook = await this.notebook_repository.save(createNotebookDto);
      return notebook;
    } catch (ex) {
      throw new BadRequestException(ex.sqlMessage);
    }
  }

  async findAll(email: string) {
    const user = await this.users_service.findByEmail(email);
    return await this.notebook_repository.findBy({ user });
  }

  findOne(id: number) {
    return this.notebook_repository.findOneByOrFail({ id }).catch((err) => {
      throw new NotFoundException(err);
    });
  }

  update(id: number, updateNotebookDto: UpdateNotebookDto) {
    return `This action updates a #${id} notebook`;
  }

  remove(id: number) {
    return `This action removes a #${id} notebook`;
  }
}
