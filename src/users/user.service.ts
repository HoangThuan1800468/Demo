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
        const saltOrRounds = 10;
        const password = `${user.password}`;
        const passwordWallet = `${user.passwordWallet}`;
        // encrypt user password and wallet password
        const hashpassword =  await bcrypt.hash(password, saltOrRounds);
        const hashpasswordWallet =  await bcrypt.hash(passwordWallet, saltOrRounds);
        // 
        user.password = hashpassword;
        user.passwordWallet = hashpasswordWallet;
        // 
        const UserNew = new this.userModel(user);
        return await UserNew.save();
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
        return await this.userModel.find()
        .then((user) => {return user})
        .catch((err) => console.log(err))
    }
    //readOneUser bang id
    async readOneUser(id){
        return await this.userModel.findById(id);
    }
    //
    async findUserForName(name){
        return await this.userModel.findOne({"username":name});
    }

    async updateUser(id,data): Promise<UserDto>{

        // get data of user
        let newdata:UserDto = await this.readOneUser(id);
        const saltOrRounds = 10;
        // if the data transactionHistory changes 
        // then proceed to add to the end of the array in db
        if(data.transactionHistory){
            const a:any = newdata.transactionHistory;
            const b:any = data.transactionHistory;
            a.push(...b);
            data.transactionHistory = a;
        }else {}
        // if the data changes 
        // then proceed encrypt and to add to the end of the array in db
        if(data.password){
            const hashpassword =  await bcrypt.hash(data.password, saltOrRounds);
            data.password = hashpassword;
        }else {}
        // 
        if(data.passwordWallet){
            const hashpassword =  await bcrypt.hash(data.passwordWallet, saltOrRounds);
            data.passwordWallet = hashpassword;
        }else {}
        // 
        data.updatedAt = Date.now();
        newdata = await {
            ...data
        }
        return await this.userModel.findByIdAndUpdate(id,newdata,{new:true})
    }
    
    //  xóa user
    async deleteUser(id){
        return await this.userModel.findByIdAndRemove(id);
    }

}