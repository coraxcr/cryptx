import axios from 'axios';
import { CurrencySummary } from '../currencies/CurrenciesSlide';
import { Currency } from '../currency/CurrencySlide';

interface CurrencySummaryDTO {
    id: number,
    name: string,
    symbol: string,
    quote: {
        USD : {
            price : number,
            market_cap : number
        }
    },
}

const baseUrl = "https://pro-api.coinmarketcap.com";

//This API key is from a dummy account, so no risk at all.
//REACT_APP_WARNING_1=ItsJustForDidacticPurposes
//REACT_APP_WARNING_2=DontExposeSecretsInClient
//REACT_APP_WARNING_3=DontVersionEnvFilesWithSecrets
const key = process.env.REACT_APP_COIN_MARKET_CAP_API_KEY;

const config = {
    headers :{
        "X-CMC_PRO_API_KEY" : key,
        "Accept": 'application/json'
    }
}

export async function getLatestCurrenciesAsync(start:number, limit:number, fieldName:string, direction : "asc"|"desc") : Promise<CurrencySummary[]> {

    const url = `${baseUrl}/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}&sort=${fieldName}&sort_dir=${direction}`
  
    const { data } = await axios.get<{data:CurrencySummaryDTO[]}>(url, config);

    const mapped = data.data.map((dto, index) : CurrencySummary => { 
        return {
            id : dto.id,
            name : dto.name,
            symbol : dto.symbol,
            market_cap: Number(dto.quote.USD.market_cap),
            price: Number(dto.quote.USD.price)
        }
    });

    return mapped;
  }

  export async function getCurrencyAsync(id:number) : Promise<Currency[]> {

    const url = `${baseUrl}/v1/cryptocurrency/quotes/latest?id=${id}   `

    const { data } = await axios.get<any>(url, config);

    return data.data[id.toString()];
    
  }