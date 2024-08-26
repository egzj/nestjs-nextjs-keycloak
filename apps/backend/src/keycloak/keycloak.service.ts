import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from 'src/env.config';

@Injectable()
export class KeycloakService {
  kcAdminClient: KcAdminClient;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    this.initAdmin();
  }

  /**
   * NOTE: @keycloak/keycloak-admin-client in nestjs
   * https://github.com/nestjs/nest/issues/7021
   * https://github.com/keycloak/keycloak-nodejs-admin-client/issues/523
   */
  private dynamicKeycloakImport = async () =>
    new Function("return import('@keycloak/keycloak-admin-client')")();

  private async initAdmin() {
    const KCadmCli = (await this.dynamicKeycloakImport()).default;
    this.kcAdminClient = new KCadmCli({
      baseUrl: this.configService.get('KEYCLOAK_BASE_URL'),
      realmName: this.configService.get('KEYCLOAK_REALM'),
    });
    await this.kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: this.configService.get('KEYCLOAK_CLIENT_ID'),
      clientSecret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
      scopes: ['openid'],
    });
  }

  getUsers = async () => {
    try {
      const users = await this.kcAdminClient.users.find();
      return users;
    } catch (err) {
      console.log(err);
      return [];
    }
    // this.kcAdminClient.realms.update({ realm: 'master' });
  };
}
