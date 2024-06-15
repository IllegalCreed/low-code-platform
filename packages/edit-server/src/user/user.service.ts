import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserActivation } from './entities/userActivation.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from '../common/utils/security';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import {
  createErrorResponse,
  createSuccessResponse,
} from '../common/utils/response';
import { MailerService } from 'src/mailer/mailer.service';
import { ErrorCode } from 'src/common/constants/error-codes';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserActivation)
    private userActivationRepository: Repository<UserActivation>,
    private mailerService: MailerService,
  ) {}

  private generateActivationToken(): string {
    // 使用 crypto 生成安全的随机令牌
    return crypto.randomBytes(16).toString('hex');
  }

  async register(createUserDto: CreateUserDto): Promise<ApiResponse<string>> {
    const { username, password, email } = createUserDto;

    if (!(await this.isUsernameAvailable(username)).data.available) {
      return createErrorResponse(ErrorCode.USERNAME_TAKEN);
    }
    if (!(await this.isEmailAvailable(email)).data.available) {
      return createErrorResponse(ErrorCode.EMAIL_TAKEN);
    }

    const hashedPassword = await hashPassword(password);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = hashedPassword;
      newUser.isActive = false;

      const savedUser = await queryRunner.manager.save(newUser);

      // Generate activation token
      const activationToken = this.generateActivationToken();
      const userActivation = new UserActivation();
      userActivation.user = savedUser;
      userActivation.token = activationToken;
      userActivation.expireTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours validity

      await queryRunner.manager.save(userActivation);

      await queryRunner.commitTransaction();

      // Send activation email
      await this.mailerService.sendActivationEmail(email, activationToken);

      return createSuccessResponse('REGISTRATION_SUCCEED');
    } catch (error) {
      return createErrorResponse(ErrorCode.REGISTRATION_FAILED);
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

  async resendActivationEmail(email: string): Promise<ApiResponse<string>> {
    // 查询用户但不限制激活状态
    const user = await this.userRepository.findOne({ where: { email } });

    // 用户不存在
    if (!user) {
      return createErrorResponse(ErrorCode.USER_NOT_FOUND);
    }

    // 用户已激活
    if (user.isActive) {
      return createErrorResponse(ErrorCode.ALREADY_ACTIVATED);
    }

    try {
      const activationToken = this.generateActivationToken();
      const newUserActivation = this.userActivationRepository.create({
        user,
        token: activationToken,
        expireTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours validity
      });

      /** NOTE: save方法可以根据我传给他的主键自己决定是INSERT还是UPDATE */
      await this.userActivationRepository.save(newUserActivation);

      // Send activation email
      await this.mailerService.sendActivationEmail(email, activationToken);

      return createSuccessResponse('RESEND_ACTIVATION_EMAIL_SUCCEED');
    } catch (error) {
      return createErrorResponse(ErrorCode.RESEND_ACTIVATION_EMAIL_FAILED);
    }
  }

  async activateAccount(token: string) {
    const activationRecord = await this.userActivationRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!activationRecord || activationRecord.expireTime < new Date()) {
      return createErrorResponse(ErrorCode.ACTIVATION_TOKEN_HAS_EXPIRED);
    }

    if (activationRecord.user.isActive) {
      return createErrorResponse(ErrorCode.ACCOUNT_ALREADY_ACTIVATED);
    }

    try {
      await this.dataSource.transaction(async (transactionalEntityManager) => {
        activationRecord.user.isActive = true;
        await transactionalEntityManager.save(activationRecord.user);

        await transactionalEntityManager.remove(activationRecord);
      });

      return createSuccessResponse('ACCOUNT_HAS_BEEN_ACTIVATED');
    } catch (error) {
      // 在这里处理异常，可以提供具体的错误信息或日志记录
      return createErrorResponse(ErrorCode.ACTIVATE_ACCOUNT_FAILED);
    }
  }
}
