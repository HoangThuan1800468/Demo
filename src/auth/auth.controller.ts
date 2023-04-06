import { Param, Controller, Get, Post, Body} from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}
    // GET
    @Get('getUserFromName/:name')
    async findUserFromName(@Param('name') name:string){
        return await this.userService.findUserFromName(name);
    }
    
    @Get('logout/:id')
    async logout(@Param('id') id:string){
        return await this.authService.logoutUser(id);
    }
    // POST
    @Post('login')
    async login(@Body() req){
        return await this.authService.validateUser(req.username,req.password);
    }
}