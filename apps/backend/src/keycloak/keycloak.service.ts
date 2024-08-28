import KcAdminClient from '@keycloak/keycloak-admin-client';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UpdateRealmDto } from 'src/customer-hubs/dtos/update-realm.dto';
import { UpdateCustomerDto } from 'src/customers/dtos/update-customer.dto';
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

  reauthenticate = async () => {
    await this.kcAdminClient.auth({
      grantType: 'client_credentials',
      clientId: this.configService.get('KEYCLOAK_CLIENT_ID'),
      clientSecret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
      scopes: ['openid'],
    });
  };

  getUsers = async () => {
    await this.reauthenticate();
    const users = await this.kcAdminClient.users.find();
    return users;
  };

  updateUser = async (customerId: string, updateDto: UpdateCustomerDto) => {
    await this.reauthenticate();
    const ret = await this.kcAdminClient.users.update(
      {
        id: customerId,
      },
      updateDto,
    );
    return ret;
  };

  getRealms = async () => {
    await this.reauthenticate();
    const realms = await this.kcAdminClient.realms.find();
    return realms;
  };

  getRealm = async (realmName: string) => {
    await this.reauthenticate();
    const realm = await this.kcAdminClient.realms.findOne({
      realm: realmName,
    });
    return realm;
  };

  updateRealm = async (realmName: string, updateDto: UpdateRealmDto) => {
    await this.reauthenticate();
    await this.kcAdminClient.realms.update(
      {
        realm: realmName,
      },
      updateDto,
    );
  };
}
