import { Module } from '@nestjs/common';
import { OrdersModule } from './usecases/orders/orders.module';
import { AuthGuard } from './usecases/auth/auth.guard';
import { AuthModule } from './usecases/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [OrdersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
