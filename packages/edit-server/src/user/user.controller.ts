import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiResponse } from '../common/interfaces/api-response.interface';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<string>> {
    return this.userService.register(createUserDto);
  }

  @Get('check-username')
  async checkUsername(
    @Query('username') username: string,
  ): Promise<ApiResponse<{ available: boolean }>> {
    return this.userService.isUsernameAvailable(username);
  }

  @Get('check-email')
  async checkEmail(
    @Query('email') email: string,
  ): Promise<ApiResponse<{ available: boolean }>> {
    return this.userService.isEmailAvailable(email);
  }
}
