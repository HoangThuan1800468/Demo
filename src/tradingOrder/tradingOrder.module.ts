import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { jwtModule } from "src/jwt.config";
import { tradingOrderSchema } from "./tradingOrder.model";
import { tradingOrderController } from "./tradingOrder.Controller";
import { tradingOrderService } from "./tradingOrder.service";
import { usersModule } from "src/users/user.module";
import { ProductModule } from "src/product/product.module";
import { WalletAuthGuard } from "src/auth/WalletAuthGuard";
import { OrderAuthGuard } from "src/auth/OrderAuthGuard";

@Module({
    imports:[jwtModule,
        usersModule,
        ProductModule,
        MongooseModule.forFeature([{name:'tradingOrder',schema:tradingOrderSchema}])
    ],
    controllers:[tradingOrderController],
    providers:[tradingOrderService,UserAuthGuard,WalletAuthGuard,OrderAuthGuard],
    exports:[tradingOrderService],
})
export class TradingOrderModule{

}