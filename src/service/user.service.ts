import { Injectable } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { User } from '../model/user';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {
  }

  async getAllUserView() {
    return await this.userDao.getAllUsers();
  }

  async addUser(user: User) {
    if (!user.username || !user.password || !user.first_name || !user.last_name || !user.email || !user.phone) {
      throw new Error('Please fill the required information!!!');
    }
    if (await this.isUserExist(user.username)) {
      throw new Error('username exists');
    }
    return await this.userDao.addUser(user);
  }

  async isUserExist(username: string): Promise<boolean> {
    const res = await this.userDao.getUserByUserName(username);
    return res.length != 0;
  }

  async clearAllUser() {
    return await this.userDao.clearAllUser();
  }

}
