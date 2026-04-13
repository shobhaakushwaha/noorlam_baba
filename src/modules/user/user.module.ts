import { Module } from '@nestjs/common';
import { OtpModule } from './otp/otp.module';
import { ProfileModule } from './profile/profile.module';
import { HomeModule } from './home/home.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [OtpModule, ProfileModule, HomeModule, CategoryModule, SubcategoryModule, ProductModule, OrderModule, CartModule]
})
export class UserModule {}
