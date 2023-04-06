import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestWithWalletPayload } from '../../types';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
  
    @Injectable()
    export class WalletOfUserGuard implements CanActivate {
      constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
      ) {}
    
      async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: RequestWithWalletPayload = context.switchToHttp().getRequest();
        if(!request.body.walletPassword){
            throw new ForbiddenException('No wallet password');
        }else{
            try{

                const walletPassword_rq = request.body.walletPassword;

                const payload = await this.jwtService.verify(request.body.accessToken);
                const idUser = payload.id;

                const dataUser = await this.userService.readOneUser(idUser);
                const walletPassword_db = `${dataUser.passwordWallet}`;

                const validPasswordWallet = await bcrypt.compare(walletPassword_rq,walletPassword_db);

                if(validPasswordWallet){
                    return true;
                }else{
                    throw new ForbiddenException('err');
                }

            }catch{
                throw new ForbiddenException('Wallet password does not match');
            }
        }
      }
    }
    