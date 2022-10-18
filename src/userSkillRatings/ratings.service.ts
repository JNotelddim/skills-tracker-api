import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RatingsService {
  constructor(private db: DatabaseService) {}

  //get all ratings for skill
  //get all skill ratings

  // create skill rating

  // NO UPDATE

  // delete skill rating

  async getRatingsBySkill(skillId: string) {
    // is this insecure? do I need to filter it by userId?
    return this.db.userSkillRating.findMany({
      where: {
        userSkillId: skillId,
        isDeleted: false,
      },
    });
  }

  async getAllSkillRatings(userId: string) {
    return this.db.userSkillRating.findMany({
      where: {
        userSkill: {
          id: userId,
        },
      },
      include: {
        userSkill: true,
      },
    });
  }

  async createSkillRating(data: Prisma.UserSkillRatingCreateInput) {
    return this.db.userSkillRating.create({
      data: {
        id: uuid(),
        rating: data.rating,
        // TODO: fix this
        userSkill: undefined,
        // userSkillId: data.userSkillId
      },
    });
  }

  async deleteSkillRating(ratingId: string) {
    return this.db.userSkillRating.update({
      where: {
        id: ratingId,
      },
      data: {
        isDeleted: true,
      },
    });
  }
}
