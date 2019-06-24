import React from 'react'

class Transactions extends React.Component {
    constructor(props) {
        super(props)
        let price = ""
        this.state = {
        shares: "",
        estimated_cost: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        if (!this.props.stock) {
            const symbol = this.props.match.params.symbol
            this.props.fetchCompanyAndQuoteData(symbol).then(this.props.fetchStockChartData1d(symbol))
        }
    }

    update_shares(field) {
        return (e) => this.setState({[field]: e.target.value})
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
            currPrice = prices[prices.length - 1]
        }
        return parseFloat(currPrice).toFixed(2)

    }

    handleSubmit() {
        let marketPrice = this.calculateCurrPrice()
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

        let stock = {symbol: stockInfo.symbol, name: stockInfo.name}
        debugger
        this.props.getStock(stock).then(stock => {
            let transaction = { portfolio_id: this.props.currentUser.portfolio.id, stock_id: stock.id, purchase_price: stockInfo.close, shares: this.state.shares}
            this.props.createTransaction(transaction)
        })

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
                                    <th align="left" >Sell {stockInfo.symbol}</th>
                                    <th align="right">...</th>
                                </tr>
                            </thead>
                            
                            <tbody id="table-body">
                                <tr>
                                    <td id="upper">Shares</td>
                                    <td align="right"><input type="number" onChange={this.update_shares("shares")} placeholder="0" value={this.state.shares} id="table-input" align="right" /></td>
                                </tr>
                                <tr className="table-market-price">
                                    <td id="table-market-price-lable">Market Price</td>
                                    <td align="right">${marketPrice}</td>
                                </tr>
                                <tr>
                                    <td id="upper">Estimated Cost</td>
                                    <td align="right">${this.state.shares == "" ? 0.00 : Number(this.state.shares * marketPrice).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                                </tr>
                            </tbody>

                        </table>
                        

                        <button onClick={() => this.handleSubmit()}>Buy</button>
                        <p id="buy-sell-p-tag">${this.props.currentUser.portfolio.buying_power.toFixed(2)} Buying Power Available</p>
                    </div>
                    <button className="add-watchlist-button">Add to Watchlist</button>
                </div>
            </div>
        )
    }
}

export default Transactions