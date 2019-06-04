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
            newState[action.symbol].about = action.data.description
            newState[action.symbol].ceo = action.data.ceo
            newState[action.symbol].industry = action.data.industry
            newState[action.symbol].sector = action.data.sector
            newState[action.symbol].exchange = action.data.exchange
            newState[action.symbol].marketCap = action.data.marketCap
            newState[action.symbol].peRatio = action.data.peRatio
            newState[action.symbol].close = action.data.close
            newState[action.symbol].avgVolume = action.data.avgTotalVolume
            newState[action.symbol].high = action.data.high
            newState[action.symbol].low = action.data.low
            newState[action.symbol].open = action.data.open
            newState[action.symbol].volume = action.data.latestVolume
            newState[action.symbol].week52high = action.data.week52high
            newState[action.symbol].week52low = action.data.week52low

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