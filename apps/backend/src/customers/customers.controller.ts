import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BASE_URL } from 'src/constants';
import { CustomersService } from 'src/customers/customers.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { KeycloakService } from 'src/keycloak/keycloak.service';

@Controller(`${BASE_URL}/customers`)
export class CustomersController {
  constructor(
    private customersService: CustomersService,
    private keycloakService: KeycloakService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    const customers = await this.keycloakService.kcAdminClient.users.find();
    return { success: true, data: customers };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req: Request) {
    console.log(req.user);
    const products = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });
    return products.json();
  }
}
