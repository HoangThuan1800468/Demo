import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { RequestWithAuth } from './types';

@Injectable()
export class UserAuthGuard implements CanActivate {
  private readonly logger = new Logger(UserAuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get accesstoken from client 
    const request: RequestWithAuth = context.switchToHttp().getRequest();
    try{
      // verify token
      const payload = this.jwtService.verify(request.body.accessToken);
      // get token from db = id in token 
      const validatetoken = await this.userService.readOneUser(payload.id);
      // token in db === token from client => is true
      if(validatetoken.token === request.body.accessToken){
        return true;
      }else{
        throw new ForbiddenException('token not validate!');
      }
    }catch{
      throw new ForbiddenException('not token!');
    }
      
        
  }
}
