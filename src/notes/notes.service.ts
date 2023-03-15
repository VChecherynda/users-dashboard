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

  async create(createNoteDto: CreateNoteDto) {
    await this.notesRepository.save(createNoteDto);
  }

  async findAll() {
    const notes = await this.notesRepository.find();

    return notes.map((note) => ({
      id: note.id,
      title: note.title,
      description: note.description,
    }));
  }

  async findOne(id: string) {
    const note = await this.notesRepository.findOneBy({ id });

    return {
      id: note.id,
      title: note.title,
      description: note.description,
    };
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.notesRepository.update(id, updateNoteDto);
  }

  async remove(id: string) {
    await this.notesRepository.delete(id);
  }
}
