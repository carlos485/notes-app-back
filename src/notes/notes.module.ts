import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotebooksModule } from 'src/notebooks/notebooks.module';
// import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Note]), NotebooksModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
