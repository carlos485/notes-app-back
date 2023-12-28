import { Transform } from 'class-transformer';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Notebook } from 'src/notebooks/entities/notebook.entity';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  content: string;

  @IsNumber()
  notebookId: number;

  notebook: Notebook;
}
