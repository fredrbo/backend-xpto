import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subject } from './Subject';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationDate: String;

  @Column()
  subjectId: number;

  @ManyToOne(() => Subject, subject => subject.id)
  subject: Subject;
}