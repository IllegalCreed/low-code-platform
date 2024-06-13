import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserActivation } from './entities/userActivation.entity';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserActivation]), MailerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 如果其他模块需要使用UserService，则需要导出
})
export class UserModule {}
