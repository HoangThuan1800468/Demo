import {Prop,Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";

export type tradingOrderDocument = tradingOrder & Document

@Schema()
export class tradingOrder{

    @Prop()
    idProduct:string;

    @Prop()
    idSeller:string;

    @Prop()
    idBuyer:string;

    @Prop()
    price:Number;

    @Prop({default:false})
    statusOrder:boolean;
    
    @Prop({default:Date.now})
    createdAt:Date;

    @Prop({default:Date.now})
    updatedAt:Date;

}

export const tradingOrderSchema = SchemaFactory.createForClass(tradingOrder);