import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user
  // POST /users/create
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);
    try {
      const newUser = await this.userService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        data: newUser,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Find and return all users
  // POST /users/all
  @Post('all')
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Find and return a user by id
  // POST /users/:id
  @Post(':id')
  async findOne(@Body('id') id: string) {
    try {
      const user = await this.userService.findOne(id);
      return {
        statusCode: HttpStatus.OK,
        message: 'User retrieved successfully',
        data: user,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Delete a user by id
  // POST /users/delete/:id
  @Post('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Body('id') id: string) {
    try {
      await this.userService.remove(id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
