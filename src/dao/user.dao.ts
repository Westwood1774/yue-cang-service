import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../model/user';

const schema = 'yuecang';
const userTable = 'user';
const table = `${schema}.${userTable}`;

@Injectable()
export class UserDao {
  constructor(@InjectRepository(User) private productRepo: Repository<User>) {
  }

  async getAllUsers(): Promise<User[]> {
    try {
      const query = `SELECT * FROM ${table};`;
      Logger.debug(query);
      const users = await this.productRepo.query(query);
      return users;
    } catch (e) {
      Logger.error(e);
    }
  }

  async addUser(user: User) {
    try {
      const username = user.username,
        password = user.password,
        fName = user.first_name,
        lName = user.last_name,
        email = user.email,
        phone = user.phone,
        role = user.role || 'NULL';
      const query = `INSERT INTO ${table} (username, password, first_name, last_name, email, phone, role) 
      VALUES ('${username}', '${password}', '${fName}', '${lName}', '${email}', '${phone}', '${role}');`;
      Logger.debug(query);
      await this.productRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async getUserByUserName(username: string) {
    try {
      const where = `WHERE U.username = '${username}'`;
      const query = `SELECT * FROM ${table} AS U ${where};`;
      Logger.debug(query);
      return await this.productRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

  async clearAllUser() {
    try {
      const query = `TRUNCATE TABLE ${table};`;
      Logger.debug(query);
      await this.productRepo.query(query);
    } catch (e) {
      Logger.error(e);
    }
  }

}
