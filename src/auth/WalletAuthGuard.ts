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
  import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';

  @Injectable()
  export class WalletAuthGuard implements CanActivate {
    private readonly logger = new Logger(WalletAuthGuard.name);
    constructor(
      private readonly jwtService: JwtService,
      private readonly userService: UserService,
    //   private readonly authService: AuthService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      // get accesstoken from client 
      const request: RequestWithAuth = context.switchToHttp().getRequest();
      
      try{
        // verify token
        
        const payload = this.jwtService.verify(request.body.accessToken);
        // get token from db = id in token 
        const validatetoken = await this.userService.readOneUser(payload.id);
        // check password wallet
        console.log(request.body.passwordWallet);
        console.log(validatetoken.passwordWallet);
        const pass_db = `${validatetoken.passwordWallet}`;
        const validPasswordWallet = await bcrypt.compare(request.body.passwordWallet,pass_db);
        console.log(validPasswordWallet);
        // token in db === token from client => is true
        if(validatetoken.token === request.body.accessToken&&validPasswordWallet){
          request.userid = payload.id;
          request.admin = payload.username;
          request.username = payload.admin;
          return true;
        }else{
          throw new ForbiddenException('token not validate!');
        }
      }catch{
        throw new ForbiddenException('not token!');
      }
        
          
    }
  }
  