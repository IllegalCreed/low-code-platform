import { Body, Controller, Post, Get, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { EmailDto } from './dto/email-validate.dto';
import { UsernameDto } from './dto/username-validate.dto';
import { ActivateDTO } from './dto/activate.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto): Promise<ApiResponse<string>> {
    return this.userService.register(createUserDto);
  }

  @Get('check-username')
  async checkUsername(
    @Query() usernameDto: UsernameDto,
  ): Promise<ApiResponse<{ available: boolean }>> {
    return this.userService.isUsernameAvailable(usernameDto.username);
  }

  @Get('check-email')
  async checkEmail(@Query() emailDto: EmailDto): Promise<ApiResponse<{ available: boolean }>> {
    return this.userService.isEmailAvailable(emailDto.email);
  }

  @Post('resend-activation-email')
  @HttpCode(HttpStatus.OK)
  async resendActivationEmail(@Body() emailDto: EmailDto): Promise<ApiResponse<any>> {
    return this.userService.resendActivationEmail(emailDto.email);
  }

  @Post('activate')
  @HttpCode(HttpStatus.OK)
  async activateAccount(@Body() activateDTO: ActivateDTO) {
    return await this.userService.activateAccount(activateDTO.token);
  }
}
