import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { logger } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test_database',
      synchronize: true,
      logging: false,
      entities: [User],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UsersController);
  }
}
