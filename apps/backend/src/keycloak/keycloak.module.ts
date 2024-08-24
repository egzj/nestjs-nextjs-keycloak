import { DynamicModule, Module } from '@nestjs/common';
import { KeycloakService } from 'src/keycloak/keycloak.service';
@Module({})
export class KeycloakModule {
  static forRoot(options: any): DynamicModule {
    const providers = [];
    if (options.useFactory) {
      providers.push({
        provide: 'KEYCLOAK_MODULE_OPTIONS',
        useFactory: options.useFactory,
        inject: options.inject || [],
      });
    }

    return {
      module: KeycloakModule,
      imports: options.imports,
      providers: [KeycloakService, ...providers],
      exports: [KeycloakService],
    };
  }
}
