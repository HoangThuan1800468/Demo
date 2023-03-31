import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { jwtModule } from "src/jwt.config";
import { ProductController } from "./product.controller";
import { ProductSchema } from "./product.model";
import { ProductService } from "./product.service";

@Module({
    imports:[
        MongooseModule.forFeature([{name:'product',schema:ProductSchema}])
    ],
    controllers:[ProductController],
    providers:[ProductService],
    exports:[ProductService],
})
export class ProductModule{

}