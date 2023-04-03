import {Prop,Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product{

    @Prop()
    productname:String;

    @Prop()
    owner:String;

    @Prop()
    image:String;

    @Prop()
    price:Number;

    @Prop()
    tradeHistory:[];

    @Prop()
    tag:[];

    @Prop()
    saleprice:Number;

    @Prop({default:false})
    status:boolean;
    
    @Prop({default:Date.now})
    createdAt:Date;

    @Prop({default:Date.now})
    updatedAt:Date;

}

export const ProductSchema = SchemaFactory.createForClass(Product);