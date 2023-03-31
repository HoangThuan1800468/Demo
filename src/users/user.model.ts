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

    @Prop({default:false})
    admin:Boolean;

    @Prop()
    wallet:String;

    @Prop()
    token:String;

    @Prop({default:Date.now})
    createdAt:Date;

    @Prop({default:Date.now})
    updatedAt:Date;

}

export const UserSchema = SchemaFactory.createForClass(User);