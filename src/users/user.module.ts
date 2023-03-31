import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { jwtModule } from "src/jwt.config";
import { userController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";

@Module({
    imports:[jwtModule,
        MongooseModule.forFeature([{name:'user',schema:UserSchema}])
    ],
    controllers:[userController],
    providers:[UserService,UserAuthGuard],
    exports:[UserService],
})
export class usersModule{

}