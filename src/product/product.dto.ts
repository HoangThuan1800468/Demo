import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class productDto{

    @IsNotEmpty()
    @Expose()
    productname:String;

    @IsNotEmpty()
    @Expose()
    owner:String;

    @Expose()
    image:String;

    @IsNotEmpty()
    @Expose()
    price:Number;

    @IsNotEmpty()
    @Expose()
    saleprice:Number;

    @IsNotEmpty()
    @Expose()
    status:boolean;
}
export class searchDto{

    @Expose()
    character:String;

}