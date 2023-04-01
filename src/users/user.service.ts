import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { User, UserDocument } from "./user.model";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
    //  gọi constructor để lấy user model
    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>){}
    //  tạo user mới sử dụng User từ modle mongoose, 
    async createUser(user: UserDto): Promise<UserDto>{
        const saltOrRounds = 10;
        const password = `${user.password}`
        const hashpassword =  await bcrypt.hash(password, saltOrRounds);
        user.password = hashpassword;
        const newUser = new this.userModel(user);
        return newUser.save();
    }
    
    // lấy toàn bộ thông tin user
    async readUser(){
        return this.userModel.find()
        .then((user) => {return user})
        .catch((err) => console.log(err))
    }
    //readOneUser bang id
    async readOneUser(id){
        return this.userModel.findById(id);
    }
    //
    async findUserForName(name){
        return this.userModel.findOne({"username":name});
    }
    //  cập nhật thông tin user nhận 2 giá trị là id từ Params và data từ Body
    async updateUser(id,data): Promise<UserDto>{
        let newdata = this.readOneUser(id);
        newdata = {
            ...data
        }
        return this.userModel.findByIdAndUpdate(id,newdata,{new:true})
    }
    
    //  xóa user
    async deleteUser(id){
        return this.userModel.findByIdAndRemove(id);
    }

}