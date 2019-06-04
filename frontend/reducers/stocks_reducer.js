import {
    RECEIVE_ALL_STOCKS, 
    RECEIVE_STOCK, //request not working, need to fix
    RECEIVE_USER_STOCKS,
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
        case RECEIVE_ALL_STOCKS:
            action.stocks.map(obj => {
                return newState[obj.symbol] = obj.name
            })

            return newState;

        case RECEIVE_STOCK_DATA:
            newState[action.symbol] = {}

            newState[action.symbol].about = action.data[action.symbol].company.description
            newState[action.symbol].ceo = action.data[action.symbol].company.CEO
            newState[action.symbol].industry = action.data[action.symbol].company.industry
            newState[action.symbol].sector = action.data[action.symbol].company.sector
            newState[action.symbol].exchange = action.data[action.symbol].company.exchange
            newState[action.symbol].marketCap = action.data[action.symbol].quote.marketCap
            newState[action.symbol].peRatio = action.data[action.symbol].quote.peRatio
            newState[action.symbol].close = action.data[action.symbol].quote.close
            newState[action.symbol].avgVolume = action.data[action.symbol].quote.avgTotalVolume
            newState[action.symbol].high = action.data[action.symbol].quote.high
            newState[action.symbol].low = action.data[action.symbol].quote.low
            newState[action.symbol].open = action.data[action.symbol].quote.open
            newState[action.symbol].volume = action.data[action.symbol].quote.latestVolume
            newState[action.symbol].week52High = action.data[action.symbol].quote.week52High
            newState[action.symbol].week52Low = action.data[action.symbol].quote.week52Low

            return newState;

        case RECEIVE_CHART_DATA:
            let filteredData = action.chartData.map( obj => {
                return ({date: obj.label, price: obj.close})
            });
            
            newState[action.symbol] = {}
            newState[action.symbol].chartData = filteredData;

            return newState;

        case RECEIVE_CHART_DATA_1D:
            let filteredData1 = action.chartData.filter( obj => obj.minute[obj.minute.length-1] === "0" || obj.minute[obj.minute.length-1] === "5");
            let filteredData2 = filteredData1.map (obj => {
                return ({time: obj.label, price: obj.close})
            })
            newState[action.symbol] = {}
            newState[action.symbol].chartData1d = filteredData2;

            return newState;

         case RECEIVE_NEWS:
             newState[action.symbol].news = action.news
             return newState;

        default:
           return oldState;
    }
}

export default stocksReducer;