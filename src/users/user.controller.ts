import { Body,Param,Inject, Controller, Get, Post, Put, Delete, UseGuards } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('users')

export class userController{

    constructor(
        private readonly userService: UserService)
    {}
    // GET
    @UseGuards(UserAuthGuard)
    @Get('allUsers')
    readUser(){
      return this.userService.readUser();
    }
    
    @Get('getUser/:id')
    async getOneUser(@Param('id') id:string){
      return this.userService.readOneUser(id);
    }
    // POST 
    @Post('createUser')
    async createUser(@Body() user:UserDto ){
        const newUser = plainToClass(UserDto,user,{excludeExtraneousValues:true});
      return this.userService.createUser(newUser);
    }
    // PUT
    @Put('updateUser/:id')
    async updateUser(@Param('id') id:string, @Body() updateData){
        const userupdate = plainToClass(UserDto,updateData,{excludeExtraneousValues:true});
      return this.userService.updateUser(id,userupdate)
    }
    // DELETE
    @Delete('deleteUser/:id')
    async deleUser(@Param('id') id:string){
      return this.userService.deleteUser(id);
    }

}