import { Body, Controller, Param, Put } from '@nestjs/common';
import { UpdateRealmDto } from 'src/customer-hubs/dtos/update-realm.dto';
import { KeycloakService } from 'src/keycloak/keycloak.service';

@Controller('customer-hubs')
export class CustomerHubsController {
  constructor(private keycloakService: KeycloakService) {}

  @Put(':realm')
  async update(
    @Param('realm') realm: string,
    @Body() { displayName }: UpdateRealmDto,
  ) {
    await this.keycloakService.kcAdminClient.realms.update(
      {
        realm,
      },
      {
        displayName,
      },
    );
  }
}
