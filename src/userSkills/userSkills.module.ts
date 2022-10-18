import { Module } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { UserSkillsController } from './userSkills.controller';
import { UserSkillsService } from './userSkills.service';

@Module({
  imports: [],
  controllers: [UserSkillsController],
  providers: [UserSkillsService, DatabaseService],
})
export class UserSkillsModule {}
