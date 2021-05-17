import { IsEmail, IsString } from 'class-validator';
import { Location, UserDetails, UserType } from '@interfaces/users.interface';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public type: UserType;

  public userDetails?: UserDetails;

  public userAddress?: Location;
}
