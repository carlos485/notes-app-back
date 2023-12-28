import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { NotebooksModule } from './notebooks/notebooks.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    NotesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'app_notes',
      synchronize: true, // no usar en prod,
      autoLoadEntities: true,
    }),
    NotebooksModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
