import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductController } from "./product.controller";
import { ProductSchema } from "./product.model";
import { ProductService } from "./product.service";
import { jwtModule } from "src/jwt.config";
import { usersModule } from "src/users/user.module";
import { ValidateToken_Guard } from "src/auth/Guards/ValidateToken_Guard";
import { CheckOwnerOfProductGuard } from "src/auth/Guards/ProductGuards/CheckOwnerOfProductGuard";

@Module({
    imports:[
        jwtModule,
        usersModule,
        MongooseModule.forFeature([{name:'product',schema:ProductSchema}])
    ],
    controllers:[ProductController],
    providers:[
        ProductService,
        ValidateToken_Guard,
        CheckOwnerOfProductGuard,
    ],
    exports:[ProductService],
})
export class ProductModule{

}