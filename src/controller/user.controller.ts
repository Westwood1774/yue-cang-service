import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../model/user';

@Controller('api/')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('users')
  async getAllUsersView() {
    return await this.userService.getAllUserView();
  }

  /*
    {
      "username": "weichen",
      "password": "123456",
      "first_name": "wei",
      "last_name": "chen",
      "email": "henrychen940822@gmail.com",
      "phone": "5513582217"
    }
   */
  @Post('register')
  async addUser(@Body() user: User) {
    return await this.userService.addUser(user);
  }

  @Delete('clear')
  async clearALLUser() {
    return await this.userService.clearAllUser();
  }
}
