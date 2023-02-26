import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { logger } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';

@Module({
  imports: [UsersModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UsersController);
  }
}
