import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { ProductDocument } from "./product.model";
import { productDto } from "./product.dto";


@Injectable()
export class ProductService{
    constructor(@InjectModel('product') private readonly productModel: Model<ProductDocument>){}

    async createProduct(product: productDto): Promise<productDto>{
        const newproduct = new this.productModel(product);
        return newproduct.save();
    }

    async getAllProduct(){
        return this.productModel.find();
    }

    async getOneProductWithId(id){
        return this.productModel.findById(id);
    }

    async getProductOfOwner(id){
        return this.productModel.find({'owner':id});
    }

    async getProductsWithTags(tag){
        return this.productModel.aggregate(
            [ 
                { $match : { tag : tag } } ,
                { $project: { 
                    image: 1, 
                    productname: 1,
                    status:1
                }}
            ]
        );
    }

    async searchProductWithString(character){
        console.log(character);
        return this.productModel.find({'productname': { $regex: character}});
    }

    async updateProduct(id,data): Promise<productDto>{
        // get data product by id
        let newdata:productDto = await this.getOneProductWithId(id);
        // if trade history change then proceed to add to the end of the array in db
        if(data.tradeHistory){
            const a : any = newdata.tradeHistory;
            const b : any = data.tradeHistory;
            a.push(...b);
            data.tradeHistory = a;
        }else {}
        // if tag change then proceed to add to the end of the array in db
        if(data.tag){
            const a : any = newdata.tag;
            const b : any = data.tag;
            a.push(...b);
            data.tag = a;
        }
        else{}
        newdata = {
            ...data
        }
        return this.productModel.findByIdAndUpdate(id,newdata,{new:true})
    }

    async deleteProduct(id){
        return this.productModel.findByIdAndRemove(id);
    }
}