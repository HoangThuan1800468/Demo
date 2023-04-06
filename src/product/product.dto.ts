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

    @Expose()
    tradeHistory:[];

    @Expose()
    tag:[];

    @IsNotEmpty()
    @Expose()
    price:Number;

    @IsNotEmpty()
    @Expose()
    saleprice:Number;

    @Expose()
    status:boolean;

    @Expose()
    updatedAt:Date;
}
export class searchDto{

    @Expose()
    character:String;

}