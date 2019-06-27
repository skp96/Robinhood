import {
    RECEIVE_PORTFOLIO,
    RECEIVE_PORTFOLIO_STOCK_DATA,
    RECEIVE_PORTFOLIO_STOCK_CHART
} from '../actions/portfolio_actions'

import {merge} from 'lodash'

const portfoliosReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    let newState = merge({}, oldState)

    switch(action.type) {
        case RECEIVE_PORTFOLIO:
            return action.portfolio

        case RECEIVE_PORTFOLIO_STOCK_DATA:
            let tickers = Object.keys(action.stockData)

            newState["stockData"] = []
            tickers.forEach(el => {
               return newState["stockData"].push({["ticker"]: el, ["price"]: action.stockData[el].quote.latestPrice, ["news"]: action.stockData[el].news })
            });
            return newState

        case RECEIVE_PORTFOLIO_STOCK_CHART:
            let items = Object.keys(action.chartData)

            newState["chart"] = []
            items.forEach(el => {
                let data = action.chartData[el].chart
                let dollarPriceChanges = []
                
                for (let i = 0; i < data.length - 1; i++) {
                    let hash = {}
                    if ((data[i + 1].close || data[i].close) === null) {
                        continue
                    } else {
                        let priceChange = (data[i + 1].close / data[i].close).toFixed(10)
                        if (priceChange === "Infinity" || priceChange === "0.0000000000") {
                            continue
                        } else {
                            hash["label"] = data[i + 1].label
                            hash["change"] = priceChange
                            dollarPriceChanges.push(hash)
                        }
                    }
                }
                return newState["chart"].push({["ticker"]: el, ["chartData"]: dollarPriceChanges})
            })
            return newState

        default:
            return oldState

    }

}

export default portfoliosReducer