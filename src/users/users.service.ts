import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private db: DatabaseService) {}

  // TODO: only return data that's appropriate to share
  // ie, remove the 'salt', 'hash', 'iterations', info

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    // TODO: let middleware handle soft deleted data
    const user = this.db.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!(await user).isDeleted) {
      return user;
    } else {
      return null;
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.db.user.findMany({
      skip,
      take,
      cursor,
      where: {
        ...where,
        isDeleted: false,
      },
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.db.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.db.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.db.user.update({
      where,
      data: {
        isDeleted: true,
      },
    });
  }
}
