import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserSkillsService {
  constructor(private db: DatabaseService) {}

  async getUserSkill(skillId: string) {
    return this.db.userSkill.findFirst({
      where: {
        id: skillId,
      },
    });
  }

  async getUserSkills(userId: string) {
    return this.db.userSkill.findMany({
      where: {
        userId,
        isDeleted: false,
      },
    });
  }

  async createOrUpdateUserSkill(data: {
    id?: string;
    name: string;
    description: string;
    userId: string;
  }) {
    if (data.id) {
      return this.db.userSkill.update({
        where: {
          id: data.id,
        },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      });
    } else {
      return this.db.userSkill.create({
        data: {
          ...data,
          id: uuid(),
          // Are these needed? I think prisma handles.
          // createdAt: new Date(),
          // updatedAt: new Date(),
        },
      });
    }
  }

  // TODO: fix data transfer type
  async updateUserSkill(data: Prisma.UserSkillUpdateInput) {
    return this.db.userSkill.update({
      where: {
        id: data.id as string,
      },
      data: {
        name: data.name,
        description: data.description,
        updatedAt: new Date(),
      },
    });
  }

  async deleteUserSkill(userSkillId: string) {
    return this.db.userSkill.update({
      where: {
        id: userSkillId,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
