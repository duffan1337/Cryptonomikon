const API_KEY =
  "b5b86a171391351d76e2c50d637743702b3e8aa971272a3c656bc51b51c1d54f";

const tickersHandlers = new Map();
const socket = new WebSocket(
  `wss://streamer.cryptocompare.com/v2/?api_key=${API_KEY}`
);

// export const loadTickers = () => {
//   if (tickersHandlers.size === 0) {
//     return;
//   }

//   fetch(
//     `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${[
//       ...tickersHandlers.keys(),
//     ].join(",")}&tsyms=USDT&api_key=${API_KEY}`
//   )
//     .then((r) => r.json())
//     .then((rawData) => {
//       const updatedPrices = Object.fromEntries(
//         Object.entries(rawData).map(([key, value]) => [key, value.USDT])
//       );
//       Object.entries(updatedPrices).forEach(([currency, newPrice]) => {
//         const handlers = tickersHandlers.get(currency) ?? [];
//         handlers.forEach((fn) => fn(newPrice));
//       });
//     });
// };

const AGGREGATE_INDEX = '5'

socket.addEventListener("message", (e) => {
  const {TYPE: type, FROMSYMBOL: currency, PRICE:newPrice} = JSON.parse(e.data)
   
  
  if(type !== AGGREGATE_INDEX || newPrice === undefined){
     if(type==="500"){
      
      const handlers = tickersHandlers.get(currency) ?? [];
  debugger
      handlers.forEach((fn) => fn(666));
    }
    return
  }
  else{ 
  const handlers = tickersHandlers.get(currency) ?? [];
  handlers.forEach((fn) => fn(newPrice));
  }
});



export const loadAllTicker = () =>
  fetch(
    "https://min-api.cryptocompare.com/data/all/coinlist?summary=true"
  ).then((r) => r.json());



function sendToWebSocket(message) {

  const stringifiedMessage = JSON.stringify(message)

  if (socket.readyState === WebSocket.OPEN) {
    socket.send(stringifiedMessage);
    return;
  }

  socket.addEventListener(
    "open",
    () => {
      socket.send(stringifiedMessage);
    },
    { once: true }
  );
}

function subscribeToTickerOnWs(ticker){
  sendToWebSocket({
    action: "SubAdd",
    subs: [`5~CCCAGG~${ticker}~USD`],
  })
}

function unSubscribeToTickerOnWs(ticker){
  sendToWebSocket({
    action: "SubRemove",
    subs: [`5~CCCAGG~${ticker}~USD`],
  })
}

export const subscribeToTicker = (ticker, cb) => {
  const subscribers = tickersHandlers.get(ticker) || [];
  tickersHandlers.set(ticker, [...subscribers, cb]);

  
  subscribeToTickerOnWs(ticker);
};

export const unSubscribeFromTicker = (ticker) => {
  tickersHandlers.delete(ticker);

  unSubscribeToTickerOnWs(ticker)
};

// setInterval(loadTickers, 5000);
window.tickers = tickersHandlers;
