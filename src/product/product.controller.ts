import { Body,Param,Inject, Controller, Get, Post, ValidationPipe, Put, Delete, UseGuards } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { productDto } from "./product.dto";
import { ProductService } from "./product.service";

@Controller('product')

export class ProductController{
    constructor(
        private readonly productService: ProductService)
    {}

    @Post()
    async createProduct(@Body() product:productDto ){
        const newproduct = plainToClass(productDto,product,{excludeExtraneousValues:true});
      return this.productService.createProduct(newproduct);
    }

    @Get()
    async getAllProduct(){
      return this.productService.getAllProduct();
    }

    @Get(':id')
    async getOneProductWithId(@Param('id') id:string){
      return this.productService.getOneProductWithId(id);
    }

    @Get('owner/:id')
    async getProductOfOwner(@Param('id') id:string){
      return this.productService.getProductOfOwner(id);
    }

    @Get('search/:character')
    async searchProductWithString(@Param('character') character:string){
      return this.productService.getProductOfOwner(character);
    }

}