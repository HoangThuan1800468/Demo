import { Body,Param,Inject, Controller, Get, Post, ValidationPipe, Put, Delete, UseGuards } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

//  router đầu tiên của module user: `http:localhost:5000/users`
//  cần khai báo nó là controller
@Controller('users')

export class userController{
    //  gọi userservice để lấy các function,
    //  thay vì mỗi khi gọi thì phải import class 
    //  rồi create new class thì xử lý theo provider của nestjs
    constructor(
        private readonly userService: UserService)
    {}

    //  tạo user mới, lấy data từ body gán vào model và gọi và truyền vào class userService.createUser
    @Post()
    async createUser(@Body() user:UserDto ){
        //  chỉ lấy những cặp key-value cần thiết, tránh người dùng thực hiện 
        //  đưa nhiều data lên sever làm sập sever
        //  data được config theo khung userDto
        const newUser = plainToClass(UserDto,user,{excludeExtraneousValues:true});
      return this.userService.createUser(newUser);
    }

    //  lấy toàn bộ user trong db
    @UseGuards(UserAuthGuard)
    @Get()
    readUser(){
      return this.userService.readUser();
    }
    //
    
    @Get(':id')
    async getOneUser(@Param('id') id:string){
      return this.userService.readOneUser(id);
    }
    //
    
    //  cập nhật thông tin user
    @Put(':id')
    async updateUser(@Param('id') id:string, @Body() updateData: UserDto):Promise<UserDto>{
        // *
        const userupdate = plainToClass(UserDto,updateData,{excludeExtraneousValues:true});
        console.log(userupdate);
      return this.userService.updateUser(id,userupdate)
    }

    //  xóa user
    @Delete(':id')
    async deleUser(@Param('id') id:string){
      return this.userService.deleteUser(id);
    }

}