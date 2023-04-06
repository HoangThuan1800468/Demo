import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { RequestWithAuthOrder } from '../../types';
  import { ProductService } from 'src/product/product.service';
import { tradingOrderService } from 'src/tradingOrder/tradingOrder.service';
  
    @Injectable()
    export class CheckBuyerOfOrder implements CanActivate {
      constructor(
        private readonly jwtService: JwtService,
        private readonly productService: ProductService,
        private readonly orderService: tradingOrderService,
      ) {}
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithAuthOrder = context.switchToHttp().getRequest();
        if(!request.body.idOrder||request.body.idOrder == null || request.body.idOrder ===""|| request.body.idOrder == undefined){
          throw new ForbiddenException('No Order id yet');
        }else{
          try{
            const idOrder = request.body.idOrder;

            const payload = await this.jwtService.verify(request.body.accessToken);
            const idUser = payload.id;

            const dataOrder = await this.orderService.getOneOrder(idOrder);
            const idOwnerOrder = dataOrder.idBuyer;

            if(idUser === idOwnerOrder){
              return true;
            }
            throw new ForbiddenException('err');
          }catch{
            throw new ForbiddenException('The user does not own the trading order');
          }
        }
      }
    }
    