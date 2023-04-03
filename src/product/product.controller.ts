import { Body,Param,Inject, Controller, Get, Post, ValidationPipe, Put, Delete, UseGuards } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { productDto, searchDto } from "./product.dto";
import { ProductService } from "./product.service";
import { ProductAuthGuard } from "src/auth/ProductAuthGuard";
import { UserAuthGuard } from "src/auth/UserAuthGuard";

@Controller('product')

export class ProductController{
    constructor(
        private readonly productService: ProductService)
    {}
    // GET
    @Get('getAllProducts')
    async getAllProduct(){
      return this.productService.getAllProduct();
    }

    @UseGuards(UserAuthGuard)
    @Get('getOneProduct/:id')
    async getOneProductWithId(@Param('id') id:string){
      return this.productService.getOneProductWithId(id);
    }

    @Get('getProductsWithTags/:tag')
    async getProductsWithTags(@Param('tag') tag:string){
      return this.productService.getProductsWithTags(tag);
    }

    @UseGuards(UserAuthGuard)
    @Get('getProductOfOwner/:id')
    async getProductOfOwner(@Param('id') id:string){
      return this.productService.getProductOfOwner(id);
    }

    @Get('searchProducts')
    async searchProductWithString(@Body() rq:searchDto){
      const keysearch = plainToClass(searchDto,rq,{excludeExtraneousValues:true});
      return this.productService.searchProductWithString(keysearch.character);
    }
    // POST
    @UseGuards(UserAuthGuard)
    @Post('createProduct')
    async createProduct(@Body() product:productDto ){
        const newproduct = plainToClass(productDto,product,{excludeExtraneousValues:true});
      return this.productService.createProduct(newproduct);
    }
    // PUT
    @UseGuards(ProductAuthGuard)
    @Put('updateProduct/:id')
    async updateProduct(@Param('id') id:string, @Body() updateData){
        const productupdate = plainToClass(productDto,updateData,{excludeExtraneousValues:true});
      return this.productService.updateProduct(id,productupdate);
    }
    // DELETE
    @UseGuards(ProductAuthGuard)
    @Delete('deleteProduct/:id')
    async deleProduct(@Param('id') id:string){
      return this.productService.deleteProduct(id);
    }
}