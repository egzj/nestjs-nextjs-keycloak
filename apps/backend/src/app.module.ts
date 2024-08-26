import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CustomersModule } from './customers/customers.module';
import { envVariablesSchema } from './env.config';
import { CustomerHubsModule } from './customer-hubs/customer-hubs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envVariablesSchema,
    }),
    CustomersModule,
    CustomerHubsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
