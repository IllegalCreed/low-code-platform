import { IsString, Length } from 'class-validator';

export class ActivateDTO {
  @IsString()
  @Length(32, 32)
  token: string;
}
