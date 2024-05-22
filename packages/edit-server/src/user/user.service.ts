import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../common/utils/security';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../common/utils/response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserInterface>> {
    const { username, password, email } = createUserDto;

    if (!(await this.isUsernameAvailable(username))) {
      return createErrorResponse('USERNAME_TAKEN');
    }
    if (!(await this.isEmailAvailable(email))) {
      return createErrorResponse('EMAIL_TAKEN');
    }

    const hashedPassword = await hashPassword(password);
    const newUser = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      isActive: true,
    });

    try {
      const savedUser = await this.userRepository.save(newUser);
      const userResponse: UserInterface = {
        id: savedUser.id,
        username: savedUser.username,
        email: savedUser.email,
        isActive: savedUser.isActive,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
        lastLogin: savedUser.lastLogin,
      };
      return createSuccessResponse(userResponse);
    } catch (error) {
      return createErrorResponse('REGISTRATION_FAILED');
    }
  }

  async isUsernameAvailable(
    username: string,
  ): Promise<ApiResponse<{ available: boolean }>> {
    const user = await this.userRepository.findOne({ where: { username } });
    const available = !user;
    return createSuccessResponse({ available });
  }

  async isEmailAvailable(
    email: string,
  ): Promise<ApiResponse<{ available: boolean }>> {
    const user = await this.userRepository.findOne({ where: { email } });
    const available = !user;
    return createSuccessResponse({ available });
  }
}
