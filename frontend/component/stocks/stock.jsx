import React from 'react'
import StockChartContainer from '../charts/stock_charts_container'
import StockNews from '../news/stock_news'
import NavBarUser from '../nav/nav_bar_user'
import TransactionsContainer from '../transactions/transactions_container'


class Stock extends React.Component {
    componentDidMount() {
        if (!this.props.stock) {
            const symbol = this.props.match.params.symbol
            this.props.fetchCompanyAndQuoteData(symbol)
            this.props.fetchStockNews(symbol)
        }
    }

    

    formatCompanyInfo (info) {
        let formattedInfo = {}

        for (var key in info) {
            if (typeof info[key] === 'number') {
                if (key === "peRatio") {
                    formattedInfo[key] = info[key]
                } else if (key === "volume" || key === "avgVolume") { 
                    if (info[key].toString().length >= 7) {
                        formattedInfo[key] = `${(info[key] / 100000).toFixed(2)}M`
                    } else {
                        formattedInfo[key] = `${info[key].toString().slice(0, (info[key].toString().length / 2))},${info[key].toString().slice(info[key].toString().length / 2)}`
                    }
                }else if (info[key].toString().length >= 10) {
                    formattedInfo[key] =  `$${(info[key] / 1000000000 ).toFixed(2)}B`
                } else if (info[key].toString().length >= 7) {
                    formattedInfo[key] = `$${(info[key] / 100000).toFixed(2)}M`
                } else if (info[key].toString().length <= 6 && !info[key].toString().includes(".")) {
                    formattedInfo[key] = `${info[key].toString().slice(0, (info[key].toString().length / 2))},${info[key].toString().slice(info[key].toString().length / 2)}`
                }else {
                    formattedInfo[key] = `$${info[key]}`
                }
            } else {
                formattedInfo[key] = info[key]
            }
        }
        return formattedInfo
    }

 
    render() {
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
        let formattedInfo = this.formatCompanyInfo(stockInfo)
        let stockNews = this.props.stock ? this.props.stock.news : []

        
        return (
            <div>
                <NavBarUser logout={this.props.logout} />
                <div className="stock-transactions-container">
                    <div className="stock-main">
                        <StockChartContainer />
                        <div className="stock-about">
                            <div className="about-line">
                                <h1>About</h1>
                            </div>
                            <h2>{stockInfo.about}</h2>
                            <table id="about-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="header">
                                        <td>CEO</td>
                                        <td>Employees</td>
                                        <td>Headquarters</td>
                                        <td>Founded</td>
                                    </tr>
                                    <tr className="about-info">
                                        <td>{stockInfo.ceo}</td>
                                        <td>-</td>
                                        <td>-</td>
                                        <td>-</td>
                                    </tr>
                                    <tr className="header">
                                        <td>Market Cap</td>
                                        <td>Price-Earnings Ratio</td>
                                        <td>Dividend Yield</td>
                                        <td>Average Volume</td>
                                    </tr>
                                    <tr className="about-info">
                                        <td>{formattedInfo.marketCap}</td>
                                        <td>{formattedInfo.peRatio}</td>
                                        <td>-</td>
                                        <td>{formattedInfo.avgVolume}</td>
                                    </tr>
                                    <tr className="header">
                                        <td>High Today</td>
                                        <td>Low Today</td>
                                        <td>Open Price</td>
                                        <td>Volume</td>
                                    </tr>
                                    <tr className="about-info">
                                        <td>{formattedInfo.high}</td>
                                        <td>{formattedInfo.low}</td>
                                        <td>{formattedInfo.open}</td>
                                        <td>{formattedInfo.volume}</td>
                                    </tr>
                                    <tr className="header">
                                        <td>52 Week High</td>
                                        <td>52 Week Low</td>
                                    </tr>
                                    <tr className="about-info">
                                        <td>{formattedInfo.week52Low}</td>
                                        <td>{formattedInfo.week52Low}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <StockNews stockNews={stockNews} />
                    </div>
                    
                    <TransactionsContainer />
                </div>
            </div>
        )
    }


}

export default Stock