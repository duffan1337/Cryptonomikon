const API_KEY = '8fb7ea53b7d1118841edff36312ac66ebb8ee48189a16be1edbb8c3e4399c817'

const tickersHandlers = new Map();

export const loadTickers = () =>{

    if(tickersHandlers.size===0){
        return
    }
    
  fetch(
    `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[...tickersHandlers.keys()].join(",")}&tsyms=USDT&api_key=${API_KEY}`
  ).then(r => r.json()).then(rawData=>{const updatedPrices = Object.fromEntries( 
    Object.entries(rawData).map(([key,value])=>[key, value.USDT]
    )
  )
  Object.entries(updatedPrices).forEach(([currency, newPrice])=>{
    const handlers = tickersHandlers.get(currency) ?? [];
    handlers.forEach(fn=>fn(newPrice))
  })
});
}

export const loadAllTicker = () =>  
  fetch(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
  ).then(r => r.json());


  export const subscribeToTicker = (ticker,cb) => {
    const subscribers = tickersHandlers.get(ticker) || [];
    tickersHandlers.set(ticker, [...subscribers, cb]);
    console.log("tickers",tickersHandlers)
  }

  export const unSubscribeFromTicker = ticker => {
   tickersHandlers.delete(ticker)
  }

  setInterval(loadTickers, 5000)
  window.tickers=tickersHandlers;