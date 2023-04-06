import { Expose } from "class-transformer";
import { IsNotEmpty, Length } from "class-validator";


export class UserDto{

    @IsNotEmpty()
    @Expose()
    username:String;

    @Expose()
    email:String;

    @IsNotEmpty()
    @Expose()
    @Length(10,30)
    password:String;

    @IsNotEmpty()
    @Expose()
    @Length(6,6)
    passwordWallet:String;

    @Expose()
    transactionHistory:[];

    @Expose()
    balanceInWallet:Number;

    @Expose()
    token:String;

    @Expose()
    updatedAt:Date;
}
export class walletInforDto{

    @Expose()
    balanceInWallet:Number;
    
    @Expose()
    transactionHistory:[];

}