import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserActivation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    comment: 'Activation token for email verification.',
  })
  token: string | null;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Expiration time for the activation token.',
  })
  expireTime: Date | null;

  @OneToOne(() => User, (user) => user.userActivation)
  @JoinColumn({ name: 'userId' })
  user: User;
}
