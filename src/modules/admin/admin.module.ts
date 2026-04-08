import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { SettingModule } from './setting/setting.module';
import { CmsModule } from './cms/cms.module';
// import { FaqModule } from './faq/faq.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { BannerModule } from './banner/banner.module';
import { InterestModule } from './interest/interest.module';
import { ControllerService } from './payment/controller/controller.service';
import { UserModule } from './user/user.module';
import { OrderService } from './order/order.service';
import { PaymentService } from './payment/payment.service';
import { OrderController } from './order/order.controller';
import { PaymentController } from './payment/payment.controller';



@Module({
  imports: [
    AuthModule,
    OtpModule,
    SettingModule,
    CmsModule,
    UserModule,
    InterestModule
  
    // FaqModule,
    // CategoryModule,
    // SubcategoryModule,
    // BannerModule,
    // InterestModule,

  ],
  controllers: [OrderController, PaymentController],
  providers: [ControllerService, OrderService, PaymentService],
})
export class AdminModule {}