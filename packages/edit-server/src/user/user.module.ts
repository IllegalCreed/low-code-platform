import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
// 如果使用TypeORM，还需要引入User实体
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 注册User实体
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 如果其他模块需要使用UserService，则需要导出
})
export class UserModule {}
