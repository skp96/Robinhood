import {
    RECEIVE_ALL_STOCKS, 
    RECEIVE_STOCK,
    RECEIVE_STOCK_DATA,
    RECEIVE_CHART_DATA,
    RECEIVE_CHART_DATA_1D,
    RECEIVE_NEWS
} from '../actions/stock_actions'
import { merge } from 'lodash'

const stocksReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = merge({}, oldState);

    switch(action.type) {

        case RECEIVE_STOCK: {
            if (!newState["current_stock"]) {
                newState["currentStock"] = {}
            }
           
           newState["currentStock"] = action.stock

           return newState
        } 
        
        case RECEIVE_ALL_STOCKS:
            if (!newState["allStocks"]) {
                newState["allStocks"] = {}
            }

            newState["allStocks"] = action.stocks

            return newState

        case RECEIVE_STOCK_DATA:
            
            if (!newState[action.symbol]) {
                newState[action.symbol] = {}
            }

            const {company, quote} = action.data[action.symbol]

            newState[action.symbol].name = company.companyName
            newState[action.symbol].about = company.description
            newState[action.symbol].ceo = company.CEO
            newState[action.symbol].industry = company.industry
            newState[action.symbol].sector = company.sector
            newState[action.symbol].exchange = company.exchange
            newState[action.symbol].marketCap = quote.marketCap
            newState[action.symbol].peRatio = quote.peRatio
            newState[action.symbol].close = quote.close
            newState[action.symbol].avgVolume = quote.avgTotalVolume
            newState[action.symbol].high = quote.high
            newState[action.symbol].low = quote.low
            newState[action.symbol].open = quote.open
            newState[action.symbol].volume = quote.latestVolume
            newState[action.symbol].week52High = quote.week52High
            newState[action.symbol].week52Low = quote.week52Low
            newState[action.symbol].changePercent = quote.changePercent
            newState[action.symbol].previousClose = quote.previousClose
            newState[action.symbol].symbol = action.symbol;

            return newState;

        case RECEIVE_CHART_DATA:
            let filteredData = action.chartData.map( obj => {
                return ({date: obj.label, price: obj.close})
            });

            if (!newState[action.symbol]){
                newState[action.symbol] = {}
            }

            newState[action.symbol].chartData = filteredData;

            
            return newState;

        case RECEIVE_CHART_DATA_1D:
            let filteredData1 = action.chartData.filter( obj => obj.minute[obj.minute.length-1] === "0" || obj.minute[obj.minute.length-1] === "5");
            let filteredData2 = filteredData1.map (obj => {
                return ({time: obj.label, price: obj.close})
            })

            if (!newState[action.symbol]) {
                newState[action.symbol] = {}
            }
            newState[action.symbol].chartData1d = filteredData2;

            
            return newState;

         case RECEIVE_NEWS:

            if (!newState[action.symbol]) {
                newState[action.symbol] = {}
            }
            
             newState[action.symbol].news = action.news
             return newState;

        default:
           return oldState;
    }
}

export default stocksReducer;