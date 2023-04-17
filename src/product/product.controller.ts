import { Body,Param,Inject, Controller, Get, Post, ValidationPipe, Put, Delete, UseGuards, ForbiddenException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { productDto, searchDto } from "./product.dto";
import { ProductService } from "./product.service";
import { ValidateToken_Guard } from "src/auth/Guards/ValidateToken_Guard";
import { CheckOwnerOfProductGuard } from "src/auth/Guards/ProductGuards/CheckOwnerOfProductGuard";

@Controller('product')

export class ProductController{
    constructor(
        private readonly productService: ProductService)
    {}
    // GET
    @Get('getAllProducts')
    async getAllProduct(){
      return await this.productService.getAllProduct();
    }
    
    @Get('getOneProduct/:id')
    async getOneProductWithId(@Param('id') id:string){
      try{
        return await this.productService.getOneProductWithId(id);
      }catch{
        throw new ForbiddenException('Not tag of product in db');
      }
      
    }

    @Get('getProductsWithTags/:tag')
    async getProductsWithTags(@Param('tag') tag:string){
      try{
        return await this.productService.getProductsWithTags(tag);
      }catch{
        throw new ForbiddenException('Not tag of product in db');
      }
      
    }

    

    @Get('searchProducts')
    async searchProductWithString(@Body() rq:searchDto){
      const keysearch = plainToClass(searchDto,rq,{excludeExtraneousValues:true});
      return await this.productService.searchProductWithString(keysearch.character);
    }
    // POST
    @UseGuards(ValidateToken_Guard)
    @Post('getProductOfOwner/:id')
    async getProductOfOwner(@Param('id') id:string){
      try{
        return await this.productService.getProductOfOwner(id);
      }catch{
        throw new ForbiddenException('Product id not in db');
      }
      
    }
    
    @UseGuards(ValidateToken_Guard)
    @Post('createProduct')
    async createProduct(@Body() product:productDto ){
        const newproduct = plainToClass(productDto,product,{excludeExtraneousValues:true});
      return await this.productService.createProduct(newproduct);
    }
    // PUT
    
    @UseGuards(CheckOwnerOfProductGuard)
    @UseGuards(ValidateToken_Guard)
    @Put('updateProduct/:id')
    async updateProduct(@Param('id') id:string, @Body() updateData){
        const productupdate = plainToClass(productDto,updateData,{excludeExtraneousValues:true});
        try{
          return await this.productService.updateProduct(id,productupdate);
        }catch{
          throw new ForbiddenException('Product id not in db');
        }
    }
    // DELETE
    @UseGuards(CheckOwnerOfProductGuard)
    @UseGuards(ValidateToken_Guard)
    @Delete('deleteProduct/:id')
    async deleProduct(@Param('id') id:string){
      try{
        return await this.productService.deleteProduct(id);
      }catch{
        throw new ForbiddenException('Product id not in db');
      }
      
    }
}