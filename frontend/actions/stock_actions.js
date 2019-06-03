import * as StockApiUtil from '../util/stock_api_util';

const RECEIVE_ALL_STOCKS = 'RECEIVE_ALL_STOCKS';
const RECEIVE_STOCK = 'RECEIVE_STOCK';
const RECEIVE_USER_STOCKS = 'RECEIVE_USER_STOCKS';
const RECEIVE_COMPANY_DATA = 'RECEIVE_COMPANY_DATA';
const RECEIVE_QUOTE = 'RECEIVE_QUOTE';
const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';
const RECEIVE_NEWS = 'RECEIVE_NEWS';

// export const getAllStocks = () => {
// }
// not sure if the request is being made correctly -- haven't 
// created user to port to stock assocation yet

export const getStock = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.getStock(symbol).then(stock => {
            return dispatch(receiveStock(stock))
        });
    };
}

export const fetchCompanyData = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.fetchCompanyData(symbol).then( data => {
            return dispatch(receiveCompanyData(data))
        });
    };
}

export const fetchStockQuote = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.fetchStockQuote(symbol).then( quote => {
            return dispatch(receiveQuote(quote))
        });
    };
}

export const fetchStocks = () => {
    return (dispatch) => {
        return StockApiUtil.fetchStocks().then(stocks => {
            return dispatch(receiveAllStocks(stocks))
        })
    }
}

export const fetchStockChartData = (symbol, range) => {
    return (dispatch) => {
        return StockApiUtil.fetchStockChartData(symbol, range).then (chartData => {
            return dispatch(receiveChartData(chartData));
        })
    }
}