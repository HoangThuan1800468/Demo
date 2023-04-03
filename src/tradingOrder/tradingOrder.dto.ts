import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";


export class tradingOrdertDto{

    @IsNotEmpty()
    @Expose()
    idProduct:string;
        

    @IsNotEmpty()
    @Expose()
    idSeller:string;

    @IsNotEmpty()
    @Expose()
    idBuyer:string;

    @IsNotEmpty()
    @Expose()
    price:Number;

    @Expose()
    statusOrder:boolean;
}