import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithAuth } from '../../types';
import { UserService } from 'src/users/user.service';
  
    @Injectable()
    export class CheckUserOfUpdateUser implements CanActivate {
      constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
      ) {}
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithAuth = context.switchToHttp().getRequest();
        if(!request.body.userid){
            throw new ForbiddenException('No user id');
        }else{
            try{

                const userId = request.body.userid;

                const payload = await this.jwtService.verify(request.body.accessToken);
                const idUser = payload.id;

                if(userId === idUser){
                  return true;
                }
                throw new ForbiddenException('err');

            }catch{
                throw new ForbiddenException('User id does not match');
            }
        }
      }
    }
    