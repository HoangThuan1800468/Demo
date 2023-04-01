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

    async searchProductWithString(character){
        console.log(character);
        return this.productModel.find({'productname': { $regex: character}});
    }

    async updateProduct(id,data): Promise<productDto>{
        let newdata = this.getOneProductWithId(id);
        newdata = {
            ...data
        }
        return this.productModel.findByIdAndUpdate(id,newdata,{new:true})
    }

    async deleteProduct(id){
        return this.productModel.findByIdAndRemove(id);
    }
}