import React from 'react'
import { addToWatchlist, removeFromWatchlist } from '../../util/watchlist_api_util';
import { fetchPortfolioStockPricesAndNews } from '../../actions/portfolio_actions';

class Transactions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        shares: "",
        estimated_cost: 0,
        stockShares: this.props.shares,
        buyingPower: this.props.currentUser.portfolio.buying_power
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSell = this.handleSell.bind(this)
        this.handleBuy = this.handleBuy.bind(this)
        this.handleWatchlist = this.handleWatchlist.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.shares != prevProps.shares) {
            return this.setState({ ["stockShares"]: this.props.shares, ["buyingPower"]: this.props.currentUser.portfolio.buying_power})
        }
    }

    removeErrors() {
        let error = document.getElementById("transaction-error")
        let transaction = document.getElementById("transaction")
        
        error.classList.add("hide")
        error.classList.remove("show")
        error.innerHTML = ""
        transaction.classList.remove("height")
    }

    componentWillUnmount() {
        document.getElementById("root").removeEventListener("click", this.removeErrors)
    }

    componentDidMount() {
        const { fetchCompanyAndQuoteData, fetchPortfolio, fetchStockChartData1d, currentUser, fetchWatchlist} = this.props
        if (!this.props.stock) {
            const symbol = this.props.match.params.symbol
            fetchCompanyAndQuoteData(symbol).then(fetchStockChartData1d(symbol)).then(fetchPortfolio(currentUser.portfolio.id))
        }
        document.getElementById("root").addEventListener("click", this.removeErrors);

        fetchWatchlist(currentUser.id).then(data => {
            
            let watchList = data.watchlist.watchlist
            let button = document.getElementById('watchlist-button')

            if (watchList.length === 0 ) {
                button.innerHTML = "Add to Watchlist"
            } else {
                for (let i = 0; i < watchList.length; i++) {
                    let obj = watchList[i]
                    let sym = this.props.match.params.symbol
                    
                    if (obj.symbol === sym) {
                        button.innerHTML = "Remove from Watchlist"
                        break
                    } else {
                        button.innerHTML = "Add to Watchlist"
                    }
                }
            }
        })

    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.symbol !== prevProps.match.params.symbol) {
            const { fetchWatchlist, currentUser, fetchStockChartData1d} = this.props
            fetchWatchlist(currentUser.id).then(data => {

                let watchList = data.watchlist.watchlist
                let button = document.getElementById('watchlist-button')

                if (watchList.length === 0) {
                    button.innerHTML = "Add to Watchlist"
                } else {
                    for (let i = 0; i < watchList.length; i++) {
                        let obj = watchList[i]
                        let sym = this.props.match.params.symbol

                        if (obj.symbol === sym) {
                            button.innerHTML = "Remove from Watchlist"
                            break
                        } else {
                            button.innerHTML = "Add to Watchlist"
                        }
                    }
                }
            })
            fetchStockChartData1d(this.props.match.params.symbol)
        }
    }

    updateShares(field) {
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
        if (prices[prices.length - 1] > 0 || prices[prices.length - 1] !== null ) {
            currPrice = prices[prices.length - 1]
        }
        return parseFloat(currPrice).toFixed(2)
    }

    handleBuy() {
        let buyButton = document.getElementById("buy-sell-button")
        buyButton.innerHTML = "Buy"


        let proceeds = document.getElementById("cost-proceeds")
        proceeds.innerHTML = "Estimated Cost"

        let buyingPower = document.getElementById("buy-sell-p-tag")
        buyingPower.innerHTML = `$${this.state.buyingPower.toLocaleString(undefined, { maximumFractionDigits: 2 })} Buying Power Available`
    }

    handleSell() {
        let sellButton = document.getElementById("buy-sell-button")
        sellButton.innerHTML = "Sell"

        let proceeds = document.getElementById("cost-proceeds")
        proceeds.innerHTML = "Estimated Proceeds"

        let shares = document.getElementById("buy-sell-p-tag")
        if (this.state.stockShares === 1) {
            shares.innerHTML = "1 share available"
        } else if (this.state.stockShares > 1) {
            shares.innerHTML = `${this.state.stockShares} shares available`
        } else {
            shares.innerHTML = "0 shares available"
        }
    }

    handleSubmit() {
        const {currentUser} = this.props
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
        let numOfShares = this.state.shares
        let quantity = this.state.stockShares
        let price = this.calculateCurrPrice()
        let marketValue = Number(this.state.shares * price)
        
        let bp = currentUser.portfolio.buying_power

        let choice = document.getElementById("buy-sell-button").innerHTML
        let sharesOrBuyingPower = document.getElementById("buy-sell-p-tag")

        if (choice === "Buy") {
            numOfShares = this.state.shares * 1
        } else {
            numOfShares = this.state.shares * -1
        }
        if (choice === "Buy" && bp > Number(marketValue)) {
            if (numOfShares > 0) {
                
                this.props.getStock(stock).then(stock => {
                    let transaction = { portfolio_id: currentUser.portfolio.id, stock_id: stock.stock.id, purchase_price: price , shares: numOfShares }
                    this.props.createTransaction(transaction)
                    this.setState({ ["stockShares"]: quantity + numOfShares})
                    sharesOrBuyingPower.innerHTML = `$${(this.state.buyingPower - Number(marketValue)).toLocaleString(undefined, { maximumFractionDigits: 2 })} Buying Power Available`
                })
            } else {
                this.renderShareErrors()
            }
            
        } else if (choice === "Buy") {
            this.renderTransactionErrors()
        }

        if (choice === "Sell") {
            if (quantity + numOfShares === 1) {
                sharesOrBuyingPower.innerHTML = "1 share available"
            } else if (quantity + numOfShares < 0) {
                sharesOrBuyingPower.innerHTML = `${quantity} shares available`
            } else {
                sharesOrBuyingPower.innerHTML = `${quantity + numOfShares} shares available`
            }
        }
        if (choice === "Sell" && quantity >= (numOfShares * -1)) {
            if ((numOfShares * -1) > 0 ) {
                this.props.getStock(stock).then(stock => {
                    let transaction = { portfolio_id: currentUser.portfolio.id, stock_id: stock.stock.id, purchase_price: stockInfo.close, shares: numOfShares }
                    this.props.createTransaction(transaction)

                    this.setState({ ["stockShares"]: quantity + numOfShares })
                })
            } else {
                this.renderShareErrors()
            }
        } else if (choice === "Sell") {
            this.renderTransactionErrors()
        }
        return this.setState({["shares"]: 0})
    }

    renderShareErrors() {
        let choice = document.getElementById("buy-sell-button").innerHTML
        let error = document.getElementById("transaction-error")
        let transaction = document.getElementById("transaction")

        if (choice === "Buy") {
            error.classList.remove("hide")
            error.classList.add("show")
            error.innerHTML = "Please enter valid share amount to purchase"
            transaction.classList.add("height")
        } else {
            error.classList.remove("hide")
            error.classList.add("show")
            error.innerHTML = "Please enter valid share amount to sell"
            transaction.classList.add("height")
        }
    }

    renderTransactionErrors() {
        let choice = document.getElementById("buy-sell-button").innerHTML
        let error = document.getElementById("transaction-error")
        let transaction = document.getElementById("transaction")
        

        if (choice === "Buy") {
            error.classList.remove("hide")
            error.classList.add("show")
            error.innerHTML = "Not enough buying power"
            transaction.classList.add("height")
        } else {
            error.classList.remove("hide")
            error.classList.add("show")
            error.innerHTML = "Not enough shares to sell"
            transaction.classList.add("height")
        }

    }

    handleWatchlist() {
        let button = document.getElementById("watchlist-button")
        let sym = this.props.match.params.symbol

        if (button.innerHTML === "Add to Watchlist") {
            addToWatchlist(sym)
            button.innerHTML = "Remove from Watchlist"
        } else  {
            removeFromWatchlist(sym)
            button.innerHTML = "Add to Watchlist"
        }
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
                    <div className="transaction" id="transaction">
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th align="left" onClick={this.handleBuy} className="buy-option">Buy {stockInfo.symbol}</th>
                                    <th align="right" onClick={this.handleSell} className="sell-option">Sell {stockInfo.symbol}</th>
                                    {/* <th align="right">...</th> */}
                                </tr>
                            </thead>
                            
                            <tbody id="table-body">
                                <tr>
                                    <td id="upper">Shares</td>
                                    <td align="right"><input type="number" onChange={this.updateShares("shares")} placeholder="0" value={this.state.shares} id="table-input" align="right" /></td>
                                </tr>
                                <tr className="table-market-price">
                                    <td id="table-market-price-lable">Market Price</td>
                                    <td align="right">${marketPrice}</td>
                                </tr>
                                <tr>
                                    <td id="upper" id="cost-proceeds">Estimated Cost</td>
                                    <td align="right" id="estimated-cost">${this.state.shares == "" ? 0.00 : Number(this.state.shares * marketPrice).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                                </tr>
                            </tbody>

                        </table>
                        
                        <div className="error-handling">
                            <div id="transaction-error" className="hide"><i className="fas fa-exclamation-circle"></i></div>
                        </div>
                            
                        <button onClick={() => this.handleSubmit()} id="buy-sell-button">Buy</button>
                        <div className="p-tag">
                            <p id="buy-sell-p-tag">${this.state.buyingPower.toLocaleString(undefined, {maximumFractionDigits:2})} Buying Power Available</p>
                        </div>
                    </div>
                    <button className="add-watchlist-button" id="watchlist-button" onClick={() => this.handleWatchlist()}></button>
                </div>
            </div>
        )
    }
}

export default Transactions