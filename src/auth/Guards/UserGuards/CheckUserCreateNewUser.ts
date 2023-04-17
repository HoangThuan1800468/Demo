import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { RequestWithAuth } from '../../types';
import { UserService } from 'src/users/user.service';
  
    @Injectable()
    export class CheckUserCreateNewUser implements CanActivate {
      constructor(
        private readonly userService: UserService,
      ) {}
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithAuth = context.switchToHttp().getRequest();
        if(!request.body.username){
            throw new ForbiddenException('No user name');
        }else{
            try{
                const userName = request.body.username;
                const resUser = await this.userService.findUserFromName(userName);
                if(!resUser){
                  return true;
                }
                throw new ForbiddenException('User name in database');
            }catch{
                throw new ForbiddenException('User name in database');
            }
        }
      }
    }
    