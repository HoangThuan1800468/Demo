import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { ProductController } from "./product.controller";
import { ProductSchema } from "./product.model";
import { ProductService } from "./product.service";
import { ProductAuthGuard } from "src/auth/ProductAuthGuard";
import { WalletAuthGuard } from "src/auth/WalletAuthGuard";
import { jwtModule } from "src/jwt.config";
import { usersModule } from "src/users/user.module";

@Module({
    imports:[
        jwtModule,
        usersModule,
        MongooseModule.forFeature([{name:'product',schema:ProductSchema}])
    ],
    controllers:[ProductController],
    providers:[ProductService,UserAuthGuard,WalletAuthGuard,ProductAuthGuard],
    exports:[ProductService],
})
export class ProductModule{

}