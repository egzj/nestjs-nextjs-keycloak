import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';
import { ProductsController } from 'src/products/products.controller';
import { ProductsService } from 'src/products/products.service';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, AccessTokenStrategy],
})
export class ProductsModule {}
