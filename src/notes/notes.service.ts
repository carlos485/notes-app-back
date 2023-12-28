import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { NotebooksService } from 'src/notebooks/notebooks.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly notes_repository: Repository<Note>,
    private notebooks_service: NotebooksService,
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const notebook = await this.notebooks_service.findOne(
        createNoteDto.notebookId,
      );
      createNoteDto.notebook = notebook;
      return await this.notes_repository.save(createNoteDto);
    } catch (ex) {
      console.error(ex);
      switch (ex.status) {
        case 404:
          throw new NotFoundException(ex.message);
        case 400:
          throw new BadRequestException(ex.message);
      }
    }
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
