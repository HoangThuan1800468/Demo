import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from 'bcrypt';
import { tradingOrderDocument } from "./tradingOrder.model";
import { tradingOrdertDto } from "./tradingOrder.dto";
import { UserService } from "src/users/user.service";
import { ProductService } from "src/product/product.service";


@Injectable()
export class tradingOrderService{
    constructor(
        @InjectModel('tradingOrder') private readonly tradingOrderModel: Model<tradingOrderDocument>,
        private readonly userService: UserService,
        private readonly productService: ProductService,
    ){}
    
    async getAllOrder(){
        return await this.tradingOrderModel.find();
    }

    async getOneOrder(id:string):Promise<tradingOrdertDto>{
        return await this.tradingOrderModel.findById(id);
    }

    async createOrder(order: tradingOrdertDto): Promise<tradingOrdertDto>{
        const newOrder = new this.tradingOrderModel(order);
        return await newOrder.save();
    }

    async updateOrder(idOrder: string,data): Promise<tradingOrdertDto>{
        data.updatedAt = Date.now();
        return await this.tradingOrderModel.findByIdAndUpdate(idOrder,data,{new:true});
    }

    async deleteOrder(id){
        return await this.tradingOrderModel.findByIdAndRemove(id);
    }

    async handleOrder(idOrder: string){
        try{
            // get information of oerder
            const inforOrder : tradingOrdertDto = await this.getOneOrder(idOrder);
            // change price type any 
            const price:any = inforOrder.price;
            const status = inforOrder.statusOrder;
            if(status){
                return `Order Id: ${idOrder}, the bill has been paid before`;
            }else{
                // get data of buyer and seller
                const data_buyer = await this.userService.readOneUser(inforOrder.idBuyer);
                const data_seller = await this.userService.readOneUser(inforOrder.idSeller);
                // change type balance wallet = any
                const balanceInWallet_buyer : any = data_buyer.balanceInWallet;
                const balanceInWallet_seller : any = data_seller.balanceInWallet;
                // handle infor
                // compare price sell and income wallet of buyer
                if(balanceInWallet_buyer < price){
                    return 'Buyer does not have enough balance to trade';
                }else{
                    // BUYER handle
                    // process the amount in the wallet after making the transaction 
                    const last_balanceInWallet_buyer:any = parseInt(balanceInWallet_buyer) - parseInt(price);
                    // create json variable to update for buyer
                    const jsonBuyer = {
                        "balanceInWallet":last_balanceInWallet_buyer,
                        "transactionHistory":[
                            idOrder
                        ]
                    }
                    await this.userService.updateUser(inforOrder.idBuyer,jsonBuyer);
                    // SELLER handle
                    // Same as handling on buyer
                    const last_balanceInWallet_seller:any = parseInt(balanceInWallet_seller) + parseInt(price);
                    
                    const jsonSeller = {
                        "balanceInWallet":last_balanceInWallet_seller,
                        "transactionHistory":[
                            idOrder
                        ]
                    }
                    await this.userService.updateUser(inforOrder.idSeller,jsonSeller);
                    // PRODUCT
                    const jsonProduct = {
                        "owner":inforOrder.idBuyer,
                        "tradeHistory":[idOrder],
                    }
                    await this.productService.updateProduct(inforOrder.idProduct,jsonProduct);
                    // TRADING_ORDER
                    const jsonTradingOrder = {
                        "statusOrder":true
                    };
                    await this.updateOrder(idOrder,jsonTradingOrder);
                    // done!
                    return `Order Id: ${idOrder}, successful transaction`;
                }   
            }
            
        }catch{
            return `Order Id: ${idOrder}, id not valid in program`;
        }
    }
}