import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { UserSkillsModule } from './userSkills/userSkills.module';

@Module({
  imports: [UsersModule, UserSkillsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
