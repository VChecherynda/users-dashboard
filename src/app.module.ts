import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/entities/user.entity';
import { NoteEntity } from './notes/entities/note.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQLHOST'),
        port: Number(configService.get('MYSQLPORT')),
        username: configService.get('MYSQLUSER'),
        password: configService.get('MYSQLPASSWORD'),
        database: configService.get('MYSQLDATABASE'),
        synchronize: true,
        logging: false,
        entities: [UserEntity, NoteEntity],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    MailModule,
    NotesModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(UsersController);
  }
}
