import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserActivation } from './userActivation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({
    comment: 'The primary identifier for a user.',
  })
  id: number;

  @Column({
    unique: true,
    comment: 'The username for the user, must be unique.',
  })
  username: string;

  @Column({
    comment: 'The password hash for the user.',
  })
  password: string;

  @Column({
    unique: true,
    comment: 'The email address for the user, must be unique.',
  })
  email: string;

  @Column({
    default: true,
    comment: 'Indicates whether the user is currently active.',
  })
  isActive: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'The timestamp when the user record was created.',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'The timestamp when the user record was last updated.',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment:
      "The timestamp of the user's last login. Can be null if the user has never logged in.",
  })
  lastLogin: Date | null;

  @OneToOne(() => UserActivation, (userActivation) => userActivation.user)
  userActivation: UserActivation;
}
