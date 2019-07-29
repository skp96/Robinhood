import React from 'react'
import ReactDOM from 'react-dom'
import * as StockApiUtil from './util/stock_api_util'
import * as SessionApiUtil from './util/session_api_util'
import * as TransactionApiUtil from './util/transaction_api_util'
import * as WatchlistApiUtil from './util/watchlist_api_util'
import Root from './component/root'
import configureStore from './store/store'

import { fetchStockChartData, fetchStockChartData1d, fetchCompanyAndQuoteData, fetchStocks, getStock, saveStock, getAllStocks  } from './actions/stock_actions'
import { fetchPortfolio, fetchPortfolioStockPricesAndNews, fetchPortfolioStockChartData} from './actions/portfolio_actions'



document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: { id: window.currentUser.id },
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    // // plain old ajax requests
    // window.getAllStocks = StockApiUtil.getAllStocks;
    // window.saveStock = StockApiUtil.saveStock({symbol: "MSFT", name: "Microsoft Corp."})
    // window.getStock = StockApiUtil.getStock("FB");
    // window.fetchCompanyData = StockApiUtil.fetchCompanyData("TSLA");
    // window.fetchStockQuote = StockApiUtil.fetchStockQuote("TSLA")
    // window.fetchStocks = StockApiUtil.fetchStocks();
    // window.fetchStockChartData = StockApiUtil.fetchStockChartData("TSLA", "1y")
    // window.fetchStockChartData1d = StockApiUtil.fetchStockChartData1d("FB")
    // window.fetchStockNews = StockApiUtil.fetchStockNews("apple")
    // window.getAllStocks = StockApiUtil.getAllStocks()

    // window.fetchWatchlist = WatchlistApiUtil.fetchWatchlist(10)
    // window.addToWatchlist = WatchlistApiUtil.addToWatchlist("FB")
    // window.removeFromWatchlist = WatchlistApiUtil.removeFromWatchlist("FB")

    // window.createTransaction = TransactionApiUtil.createTransaction({portfolio_id: 1, stock_id: 2, purchase_price: 20, shares: 9})

    // thunk actions

    // window.fetchStockChartData = fetchStockChartData("FB", "1m")
    // window.fetchStockChartData1d = fetchStockChartData1d("FB")
    // window.fetchCompanyAndQuoteData = fetchCompanyAndQuoteData("FB")
    // window.fetchStocks = fetchStocks()
    // window.getStock = getStock("ZYNE")
    // window.saveStock = saveStock({symbol: "GS", name: "Goldman Sachs"})
    // window.fetchPortfolio = fetchPortfolio(1)
    // window.fetchPortfolioStockPricesAndNews = fetchPortfolioStockPricesAndNews(["SNAP","FB","TSLA"])
    // window.fetchPortfolioStockChartData = fetchPortfolioStockChartData(["SNAP", "FB", "AAPL"], "3m")

    window.store = store
    window.getState = store.getState
    window.dispatch = store.dispatch
    const root = document.getElementById('root') 
    ReactDOM.render(<Root store={store}/>, root)
})