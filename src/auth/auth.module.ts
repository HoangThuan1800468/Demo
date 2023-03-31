import { Module } from "@nestjs/common";
import { jwtModule } from "src/jwt.config";
import { usersModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    imports:[usersModule,jwtModule],
    controllers:[AuthController],
    providers:[AuthService],
    exports:[AuthService],
})
export class AuthModule{

}