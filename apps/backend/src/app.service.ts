import { Injectable } from '@nestjs/common';
import { KeycloakService } from 'src/keycloak/keycloak.service';

@Injectable()
export class AppService {
  constructor(private keycloakService: KeycloakService) {}

  async getUsers() {
    const users = await this.keycloakService.getUsers();

    return users;
  }
}
