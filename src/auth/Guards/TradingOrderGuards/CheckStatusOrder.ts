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
    export class CheckStatusOrder implements CanActivate {
      constructor(
        private readonly jwtService: JwtService,
        private readonly productService: ProductService,
        private readonly orderService: tradingOrderService,
      ) {}
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithAuthOrder = context.switchToHttp().getRequest();
        if(!request.body.idOrder){
          throw new ForbiddenException('No Order id yet');
        }else{
          try{
            const idOrder = request.body.idOrder;

            const dataOrder = await this.orderService.getOneOrder(idOrder);
            const statusOrder = dataOrder.statusOrder;

            if(!statusOrder){
              return true;
            }
            throw new ForbiddenException('err');
          }catch{
            throw new ForbiddenException('Order completed transaction');
          }
        }
      }
    }
    