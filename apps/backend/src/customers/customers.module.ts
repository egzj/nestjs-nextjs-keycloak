import { Module } from '@nestjs/common';
import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';
import { KeycloakModule } from 'src/keycloak/keycloak.module';
import { CustomersController } from 'src/customers/customers.controller';
import { CustomersService } from 'src/customers/customers.service';

@Module({
  imports: [KeycloakModule.forRoot({})],
  controllers: [CustomersController],
  providers: [CustomersService, AccessTokenStrategy],
})
export class CustomersModule {}
