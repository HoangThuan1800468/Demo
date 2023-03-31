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

    async searchProductWithString(string){
        return this.productModel.find({ 'name':`%${string}%`});
    }
}