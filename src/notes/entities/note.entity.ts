import { Notebook } from 'src/notebooks/entities/notebook.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Notebook, (notebook) => notebook.notes, { eager: true })
  @JoinColumn({ name: 'notebookId' })
  notebook: Notebook;
}
