import * as PortfolioApiUtil from '../util/portfolio_api_util'

export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO"
export const RECEIVE_PORTFOLIO_STOCK_DATA = "RECEIVE_PORTFOLIO_STOCK_DATA"
export const RECEIVE_PORTFOLIO_STOCK_CHART = "RECEIVE_PORTFOLIO_STOCK_CHART"
export const RECEIVE_SEARCHED_STOCKS = "RECEIVE_SEARCH"


const receivePortfolio = (portfolio) => {
    return {
        type: RECEIVE_PORTFOLIO,
        portfolio: portfolio,
    }
}

const receievePortfolioStockData = (data) => {
    return {
        type: RECEIVE_PORTFOLIO_STOCK_DATA,
        stockData: data
    }
}

const receievePortfolioStockChart = (chartData) => {
    return {
        type: RECEIVE_PORTFOLIO_STOCK_CHART,
        chartData: chartData,
    }
}

const receiveSearchedStocks = (stocks) => {
    return {
        type: RECEIVE_SEARCHED_STOCKS,
        searchedStocks: stocks
    }
}

export const fetchPortfolio = (portfolioId) => {
    return (dispatch) => {
        return PortfolioApiUtil.fetchPortfolio(portfolioId).then(portfolio => {
            
            return dispatch(receivePortfolio(portfolio))
        })
    };
}

export const fetchPortfolioStockPricesAndNews = (symbols) => {
    return (dispatch) => {
        return PortfolioApiUtil.fetchPortfolioStockPricesAndNews(symbols).then(data => {
            return dispatch(receievePortfolioStockData(data))
        })
    };
}

export const fetchPortfolioStockChartData = (symbols, range) => {
    return (dispatch) => {
        return PortfolioApiUtil.fetchPortfolioStockChartData(symbols, range).then(chartData => {
            return dispatch(receievePortfolioStockChart(chartData))
        })
    }
}

export const searchStocks = (query) => {
    return (dispatch) => {
        return PortfolioApiUtil.searchStocks(query).then(stocks => {
            return dispatch(receiveSearchedStocks(stocks))
        })
    }
}