import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { BASE_URL } from 'src/constants';
import { UpdateRealmDto } from 'src/customer-hubs/dtos/update-realm.dto';
import { KeycloakService } from 'src/keycloak/keycloak.service';

@Controller(`${BASE_URL}/customer-hubs`)
export class CustomerHubsController {
  constructor(private keycloakService: KeycloakService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    try {
      const realms = await this.keycloakService.getRealms();
      return { success: true, data: realms };
    } catch (err) {
      console.error(err.message);
      throw new Error('Failed to fetch realms');
    }
  }

  @Get(':realmName')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('realm') realmName: string) {
    try {
      const realm = await this.keycloakService.getRealm(realmName);
      return { success: true, data: realm };
    } catch (err) {
      console.error(err.message);
      throw new Error('Failed to fetch realms');
    }
  }

  @Put(':realm')
  async update(
    @Param('realm') realmName: string,
    @Body() { displayName }: UpdateRealmDto,
  ) {
    try {
      await this.keycloakService.updateRealm(realmName, { displayName });
      return { success: true };
    } catch (err) {
      console.error(err.message);
      throw new Error('Failed to fetch realms');
    }
  }
}
