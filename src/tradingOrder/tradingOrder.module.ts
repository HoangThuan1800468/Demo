import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { jwtModule } from "src/jwt.config";
import { tradingOrderSchema } from "./tradingOrder.model";
import { tradingOrderController } from "./tradingOrder.Controller";
import { tradingOrderService } from "./tradingOrder.service";
import { usersModule } from "src/users/user.module";
import { ProductModule } from "src/product/product.module";
import { ValidateToken_Guard } from "src/auth/Guards/ValidateToken_Guard";
import { CheckBuyerOfOrder } from "src/auth/Guards/TradingOrderGuards/CheckBuyerOfOrder";
import { WalletOfUserGuard } from "src/auth/Guards/UserGuards/WalletOfUserGuard";
import { CheckStatusOrder } from "src/auth/Guards/TradingOrderGuards/CheckStatusOrder";

@Module({
    imports:[jwtModule,
        usersModule,
        ProductModule,
        MongooseModule.forFeature([{name:'tradingOrder',schema:tradingOrderSchema}])
    ],
    controllers:[tradingOrderController],
    providers:[
        tradingOrderService,
        ValidateToken_Guard,
        CheckBuyerOfOrder,
        WalletOfUserGuard,
        CheckStatusOrder,
    ],
    exports:[tradingOrderService],
})
export class TradingOrderModule{

}