import { Param, Controller, Get, Post, Body} from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Get(':name')
    async findUserForName(@Param('name') name:string){
        return this.userService.findUserForName(name);
    }
    @Post('login')
    async login(@Body() req){
        return this.authService.validateUser(req.username,req.password);
    }
    @Get('logout/:id')
    async logout(@Param('id') id:string){
        return this.authService.logoutUser(id);
    }
}