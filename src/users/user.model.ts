import {Prop,Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document

@Schema()
export class User{

    @Prop()
    username:String;

    @Prop()
    email:String;

    @Prop()
    password:String;

    @Prop()
    passwordWallet:String;

    @Prop()
    transactionHistory:[];

    @Prop({default:0})
    balanceInWallet:Number;

    @Prop({default:""})
    token:String;

    @Prop({default:false})
    admin:Boolean;

    @Prop({default:Date.now})
    createdAt:Date;

    @Prop({default:Date.now})
    updatedAt:Date;

}

export const UserSchema = SchemaFactory.createForClass(User);