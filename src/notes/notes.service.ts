import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
  ) {}

  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.save(createNoteDto);
  }

  findAll() {
    return `This action returns all notes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} note`;
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto);
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
