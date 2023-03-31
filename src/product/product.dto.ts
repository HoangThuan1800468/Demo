import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class productDto{

    @IsNotEmpty()
    @Expose()
    productname:String;

    @IsNotEmpty()
    @Expose()
    owner:String;

    @IsNotEmpty()
    @Expose()
    price:Number;

    @IsNotEmpty()
    @Expose()
    saleprice:Number;

}