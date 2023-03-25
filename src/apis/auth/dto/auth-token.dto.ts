import { AuthTokenReq, GrantType, Scope } from '@rahkarsanat/kiz-sdk';
import { Exclude, Expose, Transform } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import phoneValidator from 'phone';

@Exclude()
export class AuthTokenDto implements AuthTokenReq {
  @Expose()
  @IsNotEmpty()
  @IsEnum(GrantType)
  grant_type: GrantType;

  @Expose()
  @IsString()
  @IsMongoId({ message: 'app_id is not valid' })
  @IsNotEmpty()
  app_id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  domain: string;

  @Expose()
  @IsString()
  @IsMongoId({ message: 'client_id is not valid' })
  @IsNotEmpty()
  client_id: string;

  @Expose()
  @IsString()
  @IsUUID('4', { message: 'client_secret is not valid' })
  @IsNotEmpty()
  client_secret: string;

  @Expose()
  @ValidateIf((o) => o.grant_type === GrantType.OTP)
  @IsPhoneNumber('IR')
  @Transform(({ value: phone }) => {
    const p = phoneValidator(phone, { country: 'IR' });
    return p.isValid ? p.phoneNumber : p.isValid;
  })
  phone?: string;

  @Expose()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Expose()
  @IsString()
  @ValidateIf((o) => o.grant_type === GrantType.Password)
  username?: string;

  @Expose()
  @IsString()
  @ValidateIf((o) => o.grant_type === GrantType.Password)
  password?: string;

  @Expose()
  @IsOptional()
  @IsNumberString()
  confirmation_code?: string;

  @Expose()
  @IsString()
  @ValidateIf((o) => o.grant_type === GrantType.RefreshToken)
  refresh_token?: string;

  @Expose()
  @IsOptional()
  @IsEnum(Scope, { each: true })
  scope?: Scope[];

  @Expose()
  @IsString()
  @IsOptional()
  code?: string;

  @Expose()
  @IsOptional()
  @IsArray()
  roles?: string[];

  constructor(data?: Partial<AuthTokenDto>) {
    Object.assign(this, data);
  }
}
