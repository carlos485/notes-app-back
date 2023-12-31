import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotebooksService } from './notebooks.service';
import { CreateNotebookDto } from './dto/create-notebook.dto';
import { UpdateNotebookDto } from './dto/update-notebook.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('notebooks')
export class NotebooksController {
  constructor(private readonly notebooksService: NotebooksService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createNotebookDto: CreateNotebookDto, @Request() req) {
    return this.notebooksService.create(createNotebookDto, req.user.email);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Request() req) {
    return this.notebooksService.findAll(req.user.email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notebooksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNotebookDto: UpdateNotebookDto,
  ) {
    return this.notebooksService.update(+id, updateNotebookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notebooksService.remove(+id);
  }
}
