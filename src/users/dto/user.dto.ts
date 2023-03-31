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

    @Expose()
    token:String;

}