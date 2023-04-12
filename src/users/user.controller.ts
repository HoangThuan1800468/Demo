import { Body,Param,Inject, Controller, Get, Post, Put, Delete, UseGuards, ForbiddenException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { ValidateToken_Guard } from "src/auth/Guards/ValidateToken_Guard";
import { CheckUserOfUpdateUser } from "src/auth/Guards/UserGuards/CheckUserOfUpdateUser";
import { WalletOfUserGuard } from "src/auth/Guards/UserGuards/WalletOfUserGuard";

@Controller('users')

export class userController{

    constructor(
        private readonly userService: UserService)
    {}
    
    // GET
    @Get('allUsers')
    async readUser(){
      return await this.userService.readUser();
    }

    @UseGuards(ValidateToken_Guard)
    @UseGuards(CheckUserOfUpdateUser)
    @UseGuards(WalletOfUserGuard)
    @Get('getWalletUser/:id')
    async getWalletUser(@Param('id') id:string,@Body() rq){
      try{
        return await this.userService.getWalletUser(id);
      }catch{
        throw new ForbiddenException('User id not had');
      }
    }

    // POST 
    @UseGuards(ValidateToken_Guard)
    @Post('createUser')
    async createUser(@Body() user:UserDto ){
        const newUser = plainToClass(UserDto,user,{excludeExtraneousValues:true});
      return await this.userService.createUser(newUser);
    }
    @UseGuards(ValidateToken_Guard)
    @UseGuards(CheckUserOfUpdateUser)
    @Post('getUser/:id')
    async getOneUser(@Param('id') id:string){
      try{
        return await this.userService.readOneUser(id)
      }catch{
        throw new ForbiddenException('User id not had');
      }
    }
    // PUT
    @UseGuards(ValidateToken_Guard)
    @UseGuards(CheckUserOfUpdateUser)
    @Put('updateUser/:id')
    async updateUser(@Param('id') id:string, @Body() updateData){
      const userupdate = plainToClass(UserDto,updateData,{excludeExtraneousValues:true});
      try{
        return await this.userService.updateUser(id,userupdate);
      }catch{
        throw new ForbiddenException('User id not had');
      }
    }

    // DELETE
    @UseGuards(ValidateToken_Guard)
    @UseGuards(CheckUserOfUpdateUser)
    @Delete('deleteUser/:id')
    async deleUser(@Param('id') id:string){
      try{
        return await this.userService.deleteUser(id);
      }catch{
        throw new ForbiddenException('User id not had');
      }
    }
}