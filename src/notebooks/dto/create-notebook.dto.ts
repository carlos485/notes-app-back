import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export class CreateNotebookDto {
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.trim())
  name: string;

  user: User;
}
