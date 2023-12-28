import { Module } from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { NotebooksController } from './notebooks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notebook } from './entities/notebook.entity';
import { UsersModule } from 'src/users/users.module';
// import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notebook]), UsersModule],
  controllers: [NotebooksController],
  providers: [NotebooksService],
  exports: [NotebooksService],
})
export class NotebooksModule {}
