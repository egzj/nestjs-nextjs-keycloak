import { IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  firstName: string;
}
