import { InjectRepository } from '@nestjs/typeorm';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Message } from './entity/message.entity';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const messages = await this.messageRepository.find();
    client.emit('history', messages);
  }

  async handleDisconnect(client: Socket) {
    await client.disconnect();
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, room: string) {
    client.join(room);
    const messages = await this.messageRepository.findBy({ room });
    client.emit('history', messages);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, message: Message): Promise<void> {
    const newMessage = await this.messageRepository.save(message);
    this.server.to(message.room).emit('message', newMessage);
  }
}
