import React from 'react'
import ReactDOM from 'react-dom'
import * as StockApiUtil from './util/stock_api_util'
import Root from './component/root'
import configureStore from './store/store'

import { fetchStockChartData, fetchStockChartData1d, fetchCompanyAndQuoteData, fetchStocks } from './actions/stock_actions'

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
    // window.getStock = StockApiUtil.getStock("FB");
    // window.fetchCompanyData = StockApiUtil.fetchCompanyData("TSLA");
    // window.fetchStockQuote = StockApiUtil.fetchStockQuote("TSLA")
    // window.fetchStocks = StockApiUtil.fetchStocks();
    // window.fetchStockChartData = StockApiUtil.fetchStockChartData("TSLA", "1y")
    // window.fetchStockChartData1d = StockApiUtil.fetchStockChartData1d("FB")
    // window.fetchStockNews = StockApiUtil.fetchStockNews("apple")

    // thunk actions

    window.fetchStockChartData = fetchStockChartData("FB", "1m")
    // window.fetchStockChartData1d = fetchStockChartData1d("FB")
    // window.fetchCompanyAndQuoteData = fetchCompanyAndQuoteData("FB")
    // window.fetchStocks = fetchStocks()

    window.getState = store.getState
    window.store = store;
    const root = document.getElementById('root') 
    ReactDOM.render(<Root store={store}/>, root)
})