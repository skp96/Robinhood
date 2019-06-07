import React from 'react'

class Transactions extends React.Component {
    componentDidMount() {
        if (!this.props.stock) {
            const symbol = this.props.match.params.symbol
            this.props.fetchCompanyAndQuoteData(symbol).then(this.props.fetchStockChartData1d(symbol))
        }
    }

    calculateCurrPrice() {
        let currPrice = "$0.00"
        let chartData = []

        if (this.props.stock) {
            if (this.props.stock.chartData1d) {
                chartData = this.props.stock.chartData1d
            }
        }

        let prices = []
        for (var i = 0; i < chartData.length; i++) {
            prices.push(chartData[i].price)
        }
        if (prices[prices.length - 1] > 0) {
            currPrice = `$${(prices[prices.length - 1])}`
        }
        return currPrice

    }
    
    render () {
        let stockInfo = this.props.stock ? this.props.stock : {
            name: "",
            about: "",
            ceo: "",
            industry: "",
            sector: "",
            exchange: "",
            marketCap: "",
            peRatio: "",
            close: "",
            avgVolume: "",
            high: "",
            low: "",
            open: "",
            volume: "",
            week52High: "",
            week52Low: "",
            changePercent: "",
            previousClose: "",
            symbol: ""
        }
        
        let marketPrice = this.calculateCurrPrice()
        
        return (
            <div className="transaction-container">
                <div className="transaction-watchlist">
                    <div className="transaction">
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th align="left">Buy {stockInfo.symbol}</th>
                                    <th align="right">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="upper">Shares</td>
                                    <td align="right"><input type="number" value="0" id="table-input" align="right" /></td>
                                </tr>
                                <tr className="table-market-price">
                                    <td id="table-market-price-lable">Market Price</td>
                                    <td align="right">{marketPrice}</td>
                                </tr>
                                <tr>
                                    <td id="upper">Estimated Cost</td>
                                    <td align="right">$0.00</td>
                                </tr>
                            </tbody>
                        </table>

                        <button>Review Order</button>
                        <p>$0.00 Buying Power Available</p>
                    </div>
                    <button className="add-watchlist-button">Add to Watchlist</button>
                </div>
            </div>
        )
    }
}

export default Transactions