import { IsString } from 'class-validator';

export class UpdateRealmDto {
  @IsString()
  displayName: string;
}
