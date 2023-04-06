import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithAuthProduct } from '../../types';
import { ProductService } from 'src/product/product.service';

  @Injectable()
  export class CheckOwnerOfProductGuard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly productService: ProductService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: RequestWithAuthProduct = context.switchToHttp().getRequest();
      if(!request.body.idProduct || request.body.idProduct === "" || request.body.idProduct == null){
        throw new ForbiddenException('No product id yet');
      }else{
        try{
          const payload = await this.jwtService.verify(request.body.accessToken);
          const idUser = payload.id;
          const dataProduct = await this.productService.getOneProductWithId(request.body.idProduct);
          const idOwnerProduct = dataProduct.owner;
          if(idUser === idOwnerProduct){
            return true;
          }
          throw new ForbiddenException('err');
        }catch{
          throw new ForbiddenException('The user does not own the product');
        }
      }
    }
  }
  