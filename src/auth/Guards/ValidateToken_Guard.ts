import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { UserService } from 'src/users/user.service';
  import { RequestWithAuth } from '../types';
  
  @Injectable()
  export class ValidateToken_Guard implements CanActivate {
    constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: RequestWithAuth = context.switchToHttp().getRequest();
      if(!request.body.accessToken){
        throw new ForbiddenException('Dont have token user!');
      }else{
        try{
            const payload = await this.jwtService.verify(request.body.accessToken);
            const validatetoken = await this.userService.readOneUser(payload.id);
            if(validatetoken.token === request.body.accessToken){
              return true;
            }else{
                throw new ForbiddenException('err');
            }
          }catch{
            throw new ForbiddenException('Token user is not validate!');
          }
      }
    }
  }
  