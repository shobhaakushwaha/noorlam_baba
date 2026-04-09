import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { AdminAuthGuard } from './modules/admin/admin-auth.guard';

// import  UserModule  from './modules/user/user.module';
// import { SellerModule } from './modules/seller/seller.module';
// import { LogisticsModule } from './modules/logistics/logistics.module';


@Module({
  imports: [
    AdminModule,
    // UserModule,
    // SellerModule,
    // LogisticsModule, 
   ],
   
   providers: [
    {
      provide: APP_GUARD,
      useClass: AdminAuthGuard,
    },
  ],
})
export class AppModule {}
