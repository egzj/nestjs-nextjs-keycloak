import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BASE_URL } from 'src/constants';
import { ProductsService } from 'src/products/products.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';

@Controller(`${BASE_URL}/products`)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: Request) {
    console.log(req.user);
    const products = await fetch('https://dummyjson.com/products');
    return products.json();
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
