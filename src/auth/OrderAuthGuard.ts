    import {
        Injectable,
        CanActivate,
        ExecutionContext,
        ForbiddenException,
        Logger,
    } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { UserService } from 'src/users/user.service';
    import { RequestWithAuthOrder } from './types';
    import { ProductService } from 'src/product/product.service';
    import { tradingOrderService } from 'src/tradingOrder/tradingOrder.service';

    @Injectable()
    export class OrderAuthGuard implements CanActivate {
        private readonly logger = new Logger(OrderAuthGuard.name);
        constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly productService: ProductService,
        private readonly tradingOrderService: tradingOrderService,
        ) {}
    
        async canActivate(context: ExecutionContext): Promise<boolean> {
        // get accesstoken from client 
        const request: RequestWithAuthOrder = context.switchToHttp().getRequest();
        try{
            // verify token
            const payload = this.jwtService.verify(request.body.accessToken);
            // get token from db = id in token 
            const validatetoken = await this.userService.readOneUser(payload.id);
            // get data order
            const dataOrder = await this.tradingOrderService.getOneOrder(request.body.idOrder);
            // token in db === token from client => is true and 
            // validate id buyer === id user in token => true and
            // status order === false 
            if(validatetoken.token === request.body.accessToken 
                && dataOrder.idBuyer === payload.id 
                && dataOrder.statusOrder === false){
            return true;
            }else{
            throw new ForbiddenException('user not validate!');
            }
        }catch{
            throw new ForbiddenException('user not validate!!');
        }
            
            
        }
    }
  