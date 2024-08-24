import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { envVariablesSchema } from './env.config';

@Module({
  imports: [
    KeycloakModule.forRoot({}),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVariablesSchema,
    }),
    ProductsModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
