import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('message', message);
  }

  @SubscribeMessage('findAllMessages')
  async findAllMessages() {
    return await this.messagesService.findAllMessages();
  }

  @SubscribeMessage('join')
  async join(@MessageBody('userName') userName: string) {
    return await this.messagesService.joinRoom(userName);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @MessageBody('userName') userName: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.broadcast.emit('typing', { userName, isTyping });
  }
}
