import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { usersModule } from './users/user.module';
import { TradingOrderModule } from './tradingOrder/tradingOrder.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    usersModule,
    ProductModule,
    TradingOrderModule,
    AuthModule,
    MongooseModule.forRoot
    ('mongodb+srv://admin:12345@cluster0.ak2dmkd.mongodb.net/?retryWrites=true&w=majority'),
  ],

})
export class AppModule {}
