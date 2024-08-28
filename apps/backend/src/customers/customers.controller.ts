import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BASE_URL } from 'src/constants';
import { CustomersService } from 'src/customers/customers.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { KeycloakService } from 'src/keycloak/keycloak.service';
import { UpdateCustomerDto } from 'src/customers/dtos/update-customer.dto';

@Controller(`${BASE_URL}/customers`)
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    private keycloakService: KeycloakService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const customers = await this.keycloakService.getUsers();
      return { success: true, data: customers };
    } catch (err) {
      console.error(err);
      return { success: false, data: [] };
    }
  }

  @Put(':customerId')
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: Request,
    @Param('customerId') customerId: string,
    @Body() updateDto: UpdateCustomerDto,
  ) {
    try {
      const ret = await this.keycloakService.updateUser(customerId, updateDto);
      return { success: true, data: ret };
    } catch (err) {
      console.error(err);
      return { success: false, data: null };
    }
  }
}
