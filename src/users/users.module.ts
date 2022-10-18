import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { UsersController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [DatabaseService, UserService],
})
export class UsersModule {}
