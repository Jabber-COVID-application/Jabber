import { IsDate, IsDateString, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}

export class SignupDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsDateString()
  public dateOfBirth: Date;
}
