import { Body,Param,Inject, Controller, Get, Post, ValidationPipe, Put, Delete, UseGuards, ForbiddenException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { tradingOrderService } from "./tradingOrder.service";
import { tradingOrdertDto } from "./tradingOrder.dto";
import { ValidateToken_Guard } from "src/auth/Guards/ValidateToken_Guard";
import { CheckBuyerOfOrder } from "src/auth/Guards/TradingOrderGuards/CheckBuyerOfOrder";
import { WalletOfUserGuard } from "src/auth/Guards/UserGuards/WalletOfUserGuard";
import { CheckStatusOrder } from "src/auth/Guards/TradingOrderGuards/CheckStatusOrder";
@Controller('tradingOrder')

export class tradingOrderController{
    constructor(
        private readonly tradingOrderService: tradingOrderService)
    {}
    // GET
    @Get('getAllOrder')
    async getAllOrder(){
      return await this.tradingOrderService.getAllOrder();
    }
    // POST
    @UseGuards(ValidateToken_Guard)
    @Post('createOrder')
    async createOrder(@Body() order:tradingOrdertDto ){
        const newOrder = plainToClass(tradingOrdertDto,order,{excludeExtraneousValues:true});
      return await this.tradingOrderService.createOrder(newOrder);
    }

    @UseGuards(CheckBuyerOfOrder)
    @UseGuards(ValidateToken_Guard)
    @Get('getOneOrder')
    async getOneOrder(@Param('idOrder') idOrder:string){
      return await this.tradingOrderService.getOneOrder(idOrder);
    }

    // PUT
    @UseGuards(WalletOfUserGuard)
    @UseGuards(CheckStatusOrder)
    @UseGuards(CheckBuyerOfOrder)
    @UseGuards(ValidateToken_Guard)
    @Put('handleOrder/:idOrder')
    async handleOrder(@Param('idOrder') idOrder:string){
      try{
        return await this.tradingOrderService.handleOrder(idOrder)
      }catch{
        throw new ForbiddenException('id order not in db');
      }
      
    }

    // DELETE
    @Delete('deleteOrder/:id')
    async deleteOrder(@Param('id') id:string){
      try{
        return await this.tradingOrderService.deleteOrder(id);
      }catch{
        throw new ForbiddenException('id order not in db');
      }
      
    }
}