import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { User as UserModel } from '@prisma/client';
import { v4 as uuid } from 'uuid';

@Controller()
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signupUser(
    @Body() userData: { firstName?: string; lastName?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser({
      ...userData,
      id: uuid(),
      salt: Buffer.alloc(8, 0),
      hash: Buffer.alloc(8, 0),
      iterations: 0,
    });
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id });
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}