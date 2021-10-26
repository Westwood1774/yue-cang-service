import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { User } from '../model/user';
import { authenticationRequest } from '../model/authentication.request';
import { httpResponse } from '../model/http.response';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {
  }

  async getAllUserView() {
    return await this.userDao.getAllUsers();
  }

  async addUser(user: User) {
    let response: httpResponse;
    let message: string;
    if (!user.username || !user.password || !user.first_name || !user.last_name || !user.email || !user.phone) {
      message = '请填写相关注册信息!';
      response = {
        status: 'Failed',
        message: message,
        httpStatusCode: HttpStatus.BAD_REQUEST,
        body: null,
      };
      Logger.error(message);
      return response;
    }
    if (await this.isUserExist(user.username)) {
      message = '用户名已存在!';
      response = {
        status: 'Failed',
        message: message,
        httpStatusCode: HttpStatus.BAD_REQUEST,
        body: null,
      };
      Logger.error(message);
      return response;
    }
    message = '注册成功...';
    response = {
      status: 'Success',
      message: message,
      httpStatusCode: HttpStatus.ACCEPTED,
      body: null,
    };
    Logger.log(message);
    await this.userDao.addUser(user);
    return response;
  }

  async getUserByUserName(username: string): Promise<User[]> {
    const res = await this.userDao.getUserByUserName(username);
    return res;
  }

  async isUserExist(username: string): Promise<boolean> {
    const res = await this.getUserByUserName(username);
    return res.length != 0;
  }

  async login(userRequest: authenticationRequest) {
    try {
      const username = userRequest.username, password = userRequest.password;
      return this.validate(username, password);
    } catch (e) {
      Logger.error(e);
    }
  }

  async validate(username: string, password: string) {
    const userList = await this.getUserByUserName(username);
    const user = await userList[0];
    let response: httpResponse;
    let message: string;
    if (user) {
      if (user.password == password) {
        message = '登录成功...';
        response = {
          status: 'Success',
          message: message,
          httpStatusCode: HttpStatus.OK,
          body: user,
        };
        Logger.log(message);
      } else {
        message = '密码错误!';
        response = {
          status: 'Failed',
          message: message,
          httpStatusCode: HttpStatus.BAD_REQUEST,
          body: null,
        };
        Logger.error(message);
      }
    } else {
      message = '用户不存在!';
      response = {
        status: 'Failed',
        message: message,
        httpStatusCode: HttpStatus.NOT_FOUND,
        body: null,
      };
      Logger.error(message);
    }
    return response;
  }

  async clearAllUser() {
    return await this.userDao.clearAllUser();
  }

}
