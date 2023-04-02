import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto,walletInforDto } from "./dto/user.dto";
import { User, UserDocument } from "./user.model";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{

    constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>){}

    async createUser(user: UserDto): Promise<UserDto>{
        // 
        const saltOrRounds = 10;
        // 
        const password = `${user.password}`;
        const passwordWallet = `${user.passwordWallet}`;
        // 
        const hashpassword =  await bcrypt.hash(password, saltOrRounds);
        const hashpasswordWallet =  await bcrypt.hash(passwordWallet, saltOrRounds);
        // 
        user.password = hashpassword;
        user.passwordWallet = hashpasswordWallet;
        // 
        console.log(user);
        const UserNew = new this.userModel(user);
        return UserNew.save();
    }
    // Lấy thông tin wallet
    async getWalletUser(id){
        const resultdb = await this.userModel.findById(id);
        const rsWallet : walletInforDto = {
            balanceInWallet: resultdb.balanceInWallet,
            transactionHistory:resultdb.transactionHistory
        }
        return rsWallet;
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
        let newdata:UserDto = await this.readOneUser(id);
        const saltOrRounds = 10;
        if(data.transactionHistory){
            const a:any = newdata.transactionHistory;
            const b:any = data.transactionHistory;
            a.push(...b);
            console.log(a);
            data.transactionHistory = a;
        }else if(data.password){
            const hashpassword =  await bcrypt.hash(data.password, saltOrRounds);
            data.password = hashpassword;
        }else if(data.passwordWallet){
            const hashpassword =  await bcrypt.hash(data.passwordWallet, saltOrRounds);
            data.passwordWallet = hashpassword;
        }else{
            
        }
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