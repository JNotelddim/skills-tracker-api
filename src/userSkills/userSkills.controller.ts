import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserSkillsService } from './userSkills.service';

@Controller()
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  // TODO: remove userId from querystring when authguard in place
  @Get('/userSkills?userId=:id')
  async getUserSkills(@Param('id') userId: string) {
    return this.userSkillsService.getUserSkills(userId);
  }

  // TODO: remove userId from querystring when authguard in place
  @Get('/userSkills/:id')
  async getUserSkill(@Param('id') skillId: string) {
    return this.userSkillsService.getUserSkill(skillId);
  }

  // TODO: consolidate type between here and service
  @Post('/userSkills')
  async createOrUpdateUserSkill(
    @Body()
    userSkillData: {
      id?: string;
      name: string;
      description: string;
      userId: string;
    },
  ) {
    return this.userSkillsService.createOrUpdateUserSkill(userSkillData);
  }

  @Delete('/userSkills/:id')
  async deleteUserSkill(@Param('id') skillId: string) {
    return this.userSkillsService.deleteUserSkill(skillId);
  }
}
