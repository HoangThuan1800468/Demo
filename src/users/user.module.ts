import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { jwtModule } from "src/jwt.config";
import { userController } from "./user.controller";
import { UserSchema } from "./user.model";
import { UserService } from "./user.service";
import { ValidateToken_Guard } from "src/auth/Guards/ValidateToken_Guard";
import { CheckUserOfUpdateUser } from "src/auth/Guards/UserGuards/CheckUserOfUpdateUser";
import { WalletOfUserGuard } from "src/auth/Guards/UserGuards/WalletOfUserGuard";

@Module({
    imports:[jwtModule,
        MongooseModule.forFeature([{name:'user',schema:UserSchema}])
    ],
    controllers:[userController],
    providers:[
        UserService,
        ValidateToken_Guard,
        CheckUserOfUpdateUser,
        WalletOfUserGuard
    ],
    exports:[UserService],
})
export class usersModule{

}