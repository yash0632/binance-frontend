export interface Ticker {
  firstPrice: string;
  high: string;
  lastPrice: string;
  low: string;
  priceChange: string;
  priceChangePercent: string;
  symbol: string;
  trades: string;
  volume: string;
}

//{"data":{"A":"19.60","B":"56.02","E":1736172777506225,"T":1736172777497712,"a":"218.61","b":"218.58","e":"bookTicker","s":"SOL_USDC","u":1802083092},"stream":"bookTicker.SOL_USDC"}

//wss://ws.backpack.exchange/

//{"data":{"A":"6.00","B":"46.30","E":1736189041277084,"T":1736189041197902,"a":"219.42","b":"219.38","e":"bookTicker","s":"SOL_USDC","u":1802736850},"stream":"bookTicker.SOL_USDC"}

//{"data":{"E":1736172778162587,"T":1736172778151673,"U":1802083134,"a":[["219.00","2.98"]],"b":[["218.12","0.02"],["218.60","22.35"],["218.61","13.88"]],"e":"depth","s":"SOL_USDC","u":1802083137},"stream":"depth.200ms.SOL_USDC"}

//{"data":{"E":1736186248745457,"T":1736186248744398,"a":"113782701997686784","b":"113782700596854784","e":"trade","m":true,"p":"218.50","q":"0.07","s":"SOL_USDC","t":341399899},"stream":"trade.SOL_USDC"}
