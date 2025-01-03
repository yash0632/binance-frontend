import axios from 'axios'
import { Ticker } from './types';

export async function getTicker(market:string):Promise<Ticker>{
    
        const tickers = await getTickers()
        const ticker = tickers.find((ticker:any)=>{
            return ticker.symbol == market;
        })
        if(!ticker){
            throw new Error("no ticker found for " + market)
        }
        return ticker
    
}

export async function getTickers():Promise<number>{
    try{
        //const response = await axios.get(`https://api.backpack.exchange/api/v1/tickers`);
        const response:any = await new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(1);
            },2000)
        })
        
        return response.data;
    }
    catch(err){
        return Response.json({
            message:"Internal Server Error"
        })
    }
}