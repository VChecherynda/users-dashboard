import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateNoteDto, UpdateNoteDto } from './dto';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    private usersService: UsersService,
  ) {}

  async create(createNoteDto: CreateNoteDto) {
    const { userId, ...rest } = createNoteDto;

    const user = await this.usersService.findOne(userId);
    const note = await this.notesRepository.save(rest);

    user.notes.push(note);

    await this.usersService.save(user);
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
