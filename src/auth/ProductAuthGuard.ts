import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Logger,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { UserService } from 'src/users/user.service';
  import { RequestWithAuthProduct } from './types';
  import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { ProductService } from 'src/product/product.service';

  @Injectable()
  export class ProductAuthGuard implements CanActivate {
    private readonly logger = new Logger(ProductAuthGuard.name);
    constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
      private readonly productService: ProductService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // get accesstoken from client 
      const request: RequestWithAuthProduct = context.switchToHttp().getRequest();
      
      try{
        // verify token
        
        const payload = this.jwtService.verify(request.body.accessToken);
        // get token from db = id in token 
        const validatetoken = await this.userService.readOneUser(payload.id);
        // get data product
        const dataProduct = await this.productService.getOneProductWithId(request.body.idProduct);
        // token in db === token from client => is true and validate id product owner === id user in token == true
        if(validatetoken.token === request.body.accessToken && dataProduct.owner === payload.id){
          return true;
        }else{
          throw new ForbiddenException('token not validate!');
        }
      }catch{
        throw new ForbiddenException('not token!');
      }
        
          
    }
  }
  