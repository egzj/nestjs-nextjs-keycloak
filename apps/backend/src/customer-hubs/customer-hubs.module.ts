import { Module } from '@nestjs/common';
import { CustomerHubsService } from './customer-hubs.service';
import { CustomerHubsController } from './customer-hubs.controller';
import { KeycloakModule } from 'src/keycloak/keycloak.module';

@Module({
  imports: [KeycloakModule.forRoot({})],
  providers: [CustomerHubsService],
  controllers: [CustomerHubsController],
})
export class CustomerHubsModule {}
