import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { IsStrongPassword } from 'src/common/decorators/is-strong-password.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword() // 使用自定义的强密码验证装饰器
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
