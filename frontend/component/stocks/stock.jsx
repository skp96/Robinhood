import React from 'react'
import StockChartContainer from '../charts/stock_charts_container'
import StockNews from '../news/stock_news'


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
                if (key === "peRatio" || key === "avgVolume" || key === "volume") {
                    formattedInfo[key] = info[key]
                } else if (info[key].toString().length >= 10) {
                    formattedInfo[key] =  `$${(info[key] / 1000000000 ).toFixed(2)}B`
                } else if (info[key].toString().length >= 7) {
                    formattedInfo[key] = `$${(info[key] / 100000).toFixed(2)}M`
                } else if (info[key].toString().length === 5 && !info[key].toString().includes(".")) {
                    formattedInfo[key] = `$${info[key].toString().slice(0,4)},${info[key].toString().slice(4)}`
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
        }
        let formattedInfo = this.formatCompanyInfo(stockInfo)
        let stockNews = this.props.stock ? this.props.stock.news : []

        
        return (
            <div className="stock-main">
                <StockChartContainer />
                <div className="stock-about">
                    <h1>About</h1>
                    <tabel>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <div className="header">
                                <td><h3>CEO</h3></td>
                                <td><h3>Employees</h3></td>
                                <td><h3>Headquarters</h3></td>
                                <td><h3>Founded</h3></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="about-info">
                                <td><p>{stockInfo.ceo}</p></td>
                                <td><p>-</p></td>
                                <td><p>-</p></td>
                                <td><p>-</p></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="header">
                                <td><h3>Market Cap</h3></td>
                                <td><h3>Price-Earnings Ratio</h3></td>
                                <td><h3>Dividend Yield</h3></td>
                                <td><h3>Average Volume</h3></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="about-info">
                                <td><p>{formattedInfo.marketCap}</p></td>
                                <td><p>{formattedInfo.peRatio}</p></td>
                                <td><p>-</p></td>
                                <td><p>{formattedInfo.avgVolume}</p></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="header">
                                <td><h3>High Today</h3></td>
                                <td><h3>Low Today</h3></td>
                                <td><h3>Open Price</h3></td>
                                <td><h3>Volume</h3></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="about-info">
                                <td><p>{formattedInfo.high}</p></td>
                                <td><p>{formattedInfo.low}</p></td>
                                <td><p>{formattedInfo.open}</p></td>
                                <td><p>{formattedInfo.volume}</p></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="header">
                                <td><h3>52 Week High</h3></td>
                                <td><h3>52 Week Low</h3></td>
                            </div>
                        </tr>
                        <tr>
                            <div className="about-info">
                                <td><p>{formattedInfo.week52Low}</p></td>
                                <td><p>{formattedInfo.week52Low}</p></td>
                            </div>
                        </tr>

                    </tabel>
                </div>

                <StockNews stockNews={stockNews} />
            </div>
        )
    }


}

export default Stock