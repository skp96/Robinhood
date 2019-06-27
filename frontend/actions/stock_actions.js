import * as StockApiUtil from '../util/stock_api_util';

export const RECEIVE_STOCK = 'RECEIVE_STOCK';
export const RECEIVE_STOCK_DATA = 'RECEIVE_STOCK_DATA';
export const RECEIVE_ALL_STOCKS = 'RECEIVE_ALL_STOCKS';
export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';
export const RECEIVE_CHART_DATA_1D = 'RECEIVE_CHART_DATA_1D'
export const RECEIVE_NEWS = 'RECEIVE_NEWS';


const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock: stock,
    };
}

const receiveStockData = (symbol, data) => {
    return {
        type: RECEIVE_STOCK_DATA,
        symbol: symbol,
        data: data
    };
}

const receiveAllStocks = (stocks) => {
    return {
        type: RECEIVE_ALL_STOCKS,
        stocks: stocks,
    };
}

const receiveChartData = (symbol, chartData) => {
    return {
        type: RECEIVE_CHART_DATA,
        symbol: symbol,
        chartData: chartData,
    }
}

const receiveChartData1d = (symbol, chartData) => {
    return {
        type: RECEIVE_CHART_DATA_1D,
        symbol: symbol,
        chartData: chartData,
    }
}

const receiveNews = (symbol, news) => {
    return {
        type: RECEIVE_NEWS,
        symbol: symbol,
        news: news
    }
}

// export const saveStock = (stock) => {
//     return (dispatch) => {
//         return StockApiUtil.saveStock(stock).then(stock => {
//             return dispatch(receiveStock(stock))
//         });
//     };
// }

export const getStock = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.getStock(symbol).then(stock => {
            return dispatch(receiveStock(stock))
        });
    }
}

export const fetchCompanyAndQuoteData = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.fetchCompanyAndQuoteData(symbol).then(data => {
            return dispatch(receiveStockData(symbol, data))
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
        return StockApiUtil.fetchStockChartData(symbol, range).then(chartData => {
            return dispatch(receiveChartData(symbol, chartData));
        })
    }
}

export const fetchStockChartData1d = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.fetchStockChartData1d(symbol).then(chartData => {
            return dispatch(receiveChartData1d(symbol, chartData))
        }) 
    }
}

export const fetchStockNews = (symbol) => {
    return (dispatch) => {
        return StockApiUtil.fetchStockNews(symbol).then(news => {
            return dispatch(receiveNews(symbol, news))
        } )
    }
}