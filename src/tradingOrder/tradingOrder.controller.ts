import { Body,Param,Inject, Controller, Get, Post, ValidationPipe, Put, Delete, UseGuards } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { tradingOrderService } from "./tradingOrder.service";
import { tradingOrdertDto } from "./tradingOrder.dto";
import { WalletAuthGuard } from "src/auth/WalletAuthGuard";
import { UserAuthGuard } from "src/auth/UserAuthGuard";
import { ProductAuthGuard } from "src/auth/ProductAuthGuard";
import { OrderAuthGuard } from "src/auth/OrderAuthGuard";
@Controller('tradingOrder')

export class tradingOrderController{
    constructor(
        private readonly tradingOrderService: tradingOrderService)
    {}
    // GET
    @Get('getAllOrder')
    async getAllOrder(){
      return this.tradingOrderService.getAllOrder();
    }
    // POST
    @UseGuards(UserAuthGuard)
    @Post('createOrder')
    async createOrder(@Body() order:tradingOrdertDto ){
        const newOrder = plainToClass(tradingOrdertDto,order,{excludeExtraneousValues:true});
      return this.tradingOrderService.createOrder(newOrder);
    }
    // PUT
    @UseGuards(WalletAuthGuard)
    @Put('handleOrder/:idOrder')
    async handleOrder(@Param('idOrder') id:string){
      return this.tradingOrderService.handleOrder(id)
    }
    // DELETE
    @UseGuards(OrderAuthGuard)
    @Delete('deleteOrder/:id')
    async deleteOrder(@Param('id') id:string){
      return this.tradingOrderService.deleteOrder(id);
    }
}