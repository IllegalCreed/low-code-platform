import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
// import { User } from './user/entities/user.entity';
// import { UserActivation } from './user/entities/userActivation.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // entities: [User, UserActivation], // autoLoadEntities为true则无需手动维护entities
      synchronize: process.env.TYPEORM_SYNC === 'true', // 生产环境需要设置为false
      autoLoadEntities: true,
    }),
    UserModule,
    MailerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
