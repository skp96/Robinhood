import React from 'react';
import NavBarUser from '../nav/nav_bar_user'
import { Link } from 'react-router-dom';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts'
import NavBarContainer from '../nav/nav_container'

class HomeUser extends React.Component {
    
    componentDidMount() {
        const { currentUser, fetchPortfolio, fetchPortfolioStockPricesAndNews, fetchPortfolioStockChartData, fetchTransactions, fetchWatchlist} = this.props
            let symbols = []
        
            fetchPortfolio(currentUser.portfolio.id).then(data => {
                for (let i = 0; i < data.portfolio.currentPortfolio.length; i++) {
                    let object = data.portfolio.currentPortfolio[i];
                    symbols.push(Object.keys(object).join(""))
                }
            }).then( () => {
                fetchPortfolioStockChartData(symbols, "1M")
            }).then( () => {
                fetchWatchlist(currentUser.id).then(data => {
                    let watchlist = data.watchlist.watchlist
                    if (watchlist.length > 0) {
                        for (let j = 0; j < watchlist.length; j++) {
                            let obj = watchlist[j]
                            symbols.push(obj["symbol"])
                        }
                    }
                }).then(() => {
                    fetchPortfolioStockPricesAndNews(symbols)
                })
            })
    }


    portfolioValueCalc() {
        const {stockData, currentPortfolio} = this.props.portfolio
        let portfolioValue = 0

        let data = stockData ? stockData : []
        
        let currPort = currentPortfolio ? currentPortfolio : []
        let portData = data.slice(0, currPort.length)
        if (portData.length > 0) {
            for (let i = 0; i < portData.length; i++) {
                let ticker = portData[i]["ticker"]
                let price = portData[i]["price"]
                let shares = currPort[i][ticker]
                portfolioValue += (price * shares)
            }
            return portfolioValue
        } else {
            return portfolioValue
        }
    }

    portfolioCalc() {
        const {chart} = this.props.portfolio
        const {buying_power} = this.props.currentUser.portfolio 

        let data = chart ? chart : []
        let placeholder = [{"label": "", "portValue": ""}]

        if (data.length != 0) {
            let portfolioValue = this.portfolioValueCalc() + buying_power

            let initialChartData = data[0]
            let remainingChartData = data.slice(1)
            let finalData = []

            if (remainingChartData.length === 0) {

                for (let a = 0; a < initialChartData.chartData.length; a++) {
                    let newObj = {}
                    let initialObj = initialChartData.chartData[a]
                    let time = initialObj.label
                    let value = (portfolioValue * initialObj.change)

                    newObj["label"] = time
                    newObj["portValue"] = value

                    finalData.push(newObj)

                }
            } else {
                for (let j = 0; j < initialChartData.chartData.length; j++) {
                    let initialTicker = initialChartData.chartData[j]
                    let firstTime = initialTicker.label

                    let firstTempPV = (portfolioValue * initialTicker.change)
                    let l = 0
                    let hash = { "label": "", "portValue": 0 }

                    while (l < remainingChartData.length) {

                        for (let k = 0; k < remainingChartData[l].chartData.length; k++) {
                            let otherticker = remainingChartData[l].chartData[k]

                            let secondTime = otherticker.label
                            let secondTempPv = firstTempPV

                            if (firstTime === secondTime) {
                                secondTempPv *= Number(otherticker.change)
                                hash["label"] = firstTime
                                hash["portValue"] += Number(secondTempPv.toFixed(2))
                            }
                            portfolioValue = secondTempPv
                        }
                        l++
                    }
                    finalData.push(hash)
                }
            }
            return finalData
        }
        return placeholder
    }

    getLatestValue() {
        let data = this.portfolioCalc()
        let portValue = '$0.00'

        if (data.length != 0) {
            let value = (data[data.length - 1].portValue).toLocaleString(undefined, { maximumFractionDigits: 2 })
            portValue = `$${value}`
        }
        return portValue
    }

    calculatePortChange() {
        let portChange = '$0.00'

        let chartData = this.portfolioCalc()

        let portValues = []

        if (chartData.length != 0) {
            for (let i = 0; i < chartData.length; i++) {
                portValues.push(chartData[i].portValue)
            }
        } else {
            return portChange
        }

        if (portValues[portValues.length - 1] - portValues[0] > 0) {
            portChange = `+$${((portValues[portValues.length - 1] - portValues[0]).toLocaleString(undefined, { maximumFractionDigits: 2 }))}`
        } else {
            portChange = `+$${((portValues[portValues.length - 1] - portValues[0]) * -1).toLocaleString(undefined, { maximumFractionDigits: 2 })}`
        }
        return portChange
    }

    calculatePercentagePortChange() {
        let percentagePortChange = "[0.00%]"

        let chartData = this.portfolioCalc()
        let values = []

        if (chartData.length !== 0) {
            for (let i = 0; i < chartData.length; i++) {
                values.push(chartData[i].portValue)
            }
        } else {
            return percentagePortChange
        }

        percentagePortChange = `${((((values[values.length - 1] - values[0]) / values[0]) * 100).toFixed(2))}%`

        return `[${percentagePortChange}]`
    }
    
    color() {
        let portData = this.portfolioCalc
        let color = '#21ce99'

        if (portData.length !== 0) {
           if (portData[portData.length - 1].portValue - portData[0].portValue > 0) {
                color = '#21ce99'
            } else {
                color = '#F45531'
            } 
        }
        return color
    }

    handleOnClick(e, range) {
        e.preventDefault()
        const { currentPortfolio } = this.props.portfolio
        const { fetchPortfolioStockChartData } = this.props
        let portfolio = currentPortfolio ? currentPortfolio : []

        if (portfolio.length != 0 ) {
            let symbols = portfolio.map((object => {
                return (Object.keys(object))
            }))

            fetchPortfolioStockChartData(symbols, range)
        }

    }

    renderStockNews() {
        const {stockData} = this.props.portfolio
        let news = stockData ? stockData : []

        if (news.length != 0) {
            let newsData = []

            for (let i = 0; i < news.length; i++) {
                let obj = news[i]
                
                if (obj.news.length === 0) {
                    continue;
                } else {
                    let data= obj.news
                    for (let i = 0; i < data.length; i++) {
                        let currData = data[i]
                        newsData.push(
                            <li key={i}>
                                <a href={currData.url} className="portfolio-news-item">
                                    <div className="img" style={{ "backgroundImage": `url('${currData.image}')` }}></div>
                                    <div className="portfolio-news-content">
                                        <h3>{currData.source}</h3>
                                        <h4>{currData.headline}</h4>
                                    </div>
                                </a>
                            </li>
                        )
                    }
                }
            }
            
            return newsData
        } else {
            return news
        }
    }

    renderPortfolioTableBody() {
        const {currentPortfolio, stockData} = this.props.portfolio
        let stocks = currentPortfolio ? currentPortfolio : []
        let prices = stockData ? stockData : []
        

        if (prices.slice(0,stocks.length + 1).length != 0 && stocks.length != 0) {
            let finalData = []
            for (let i = 0; i < stocks.length; i++) {
                let newObj = {}
                let stockObj = stocks[i]
    
                let stockprice = prices[i].price
                newObj["ticker"] = Object.keys(stockObj).join("")
                newObj["price"] = stockprice
                finalData.push(newObj)
            }
    
            const tableBody = finalData.map((obj, idx) => {
                return (
                    <Link style={{ textDecoration: 'none', color: "black"}} to={`/stocks/${obj.ticker}`} className="table-row" key={idx}>
                        <div className="table-cell">{obj.ticker}</div>
                        <div className="table-cell-chart">{
                            <LineChart width={45} height={16} data={[{ label: 1, portValue: 100 }, { label: 2, portValue: 98 }, { label: 3, portValue: 103 }, { label: 4, portValue: 76 }, { label: 5, portValue: 130 }]} margin={{ top: 5, right: 3, left: 0, bottom: 5 }}>
                                <XAxis dataKey="label" hide={true} />
                                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                <Line type="linear" dataKey="portValue" dot={false} stroke={this.color()} strokeWidth={2} />
                            </LineChart>

                        }</div>
                        <div className="table-cell">${obj.price}</div>
                        <div className="break"></div>
                    </Link>
                )
            })
            return tableBody
        } else {
            return (
                <div ></div>
            )
        }

    }

    renderWatchlistTableBody() {
        const { currentPortfolio, stockData } = this.props.portfolio
        let stocks = currentPortfolio ? currentPortfolio : []
        const {watchlist} = this.props.watchlist
        let userWatchlist = watchlist ? watchlist : []
        let watchlistPrices = stockData ? stockData : []
        if (watchlistPrices.length != 0 && userWatchlist.length != 0) {
            let finalData = []

            for (let i = 0; i < userWatchlist.length; i++) {
                let newObj = {}
                
                let ticker = userWatchlist[i].symbol;
                for (let j = 0; j < watchlistPrices.length; j++) {
                    let priceTicker = watchlistPrices[j].ticker
                    if (ticker === priceTicker) {
                        newObj["ticker"] = ticker
                        newObj["price"] = watchlistPrices[i].price
                    }
                }
                
                finalData.push(newObj)
            }

            const tableBody = finalData.map((obj, idx) => {
                return (
                    <Link style={{ textDecoration: 'none', color: "black" }} to={`/stocks/${obj.ticker}`} className="table-row" key={idx}>
                        <div className="table-cell">{obj.ticker}</div>
                        <div className="table-cell-chart">{
                            <LineChart width={45} height={16} data={[{ label: 1, portValue: 100 }, { label: 2, portValue: 98 }, { label: 3, portValue: 103 }, { label: 4, portValue: 76 }, { label: 5, portValue: 130 }]} margin={{ top: 5, right: 3, left: 0, bottom: 5 }}>
                                <XAxis dataKey="label" hide={true} />
                                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                <Line type="linear" dataKey="portValue" dot={false} stroke={this.color()} strokeWidth={2} />
                            </LineChart>

                        }</div>
                        <div className="table-cell">${obj.price}</div>
                        <div className="break"></div>
                    </Link>
                )
            })
            tableBody.unshift(
                <div className="table-row-header">
                    <div className="table-row-header-cell">Watchlist</div>
                    <div className="table-row-header-cell"></div>
                    <div className="table-row-header-cell">...</div>
                </div>
            )
            return tableBody
        } else {
            return (
                <div></div>
            )
        }
    }
    
    render() {
        return (
            <>
                <div className="main-user">
                    <div className="nav-bar">
                        <NavBarContainer />
                    </div>
                </div>
                <div className="portfolio-container">
                    <div className="portfolio-main">
                        <div className="portfolio-graph">
                            <div className="graph-fin-metrics">
                                <h1>{this.getLatestValue()}</h1>
                                <div className="metric-changes">
                                    <h3>{this.calculatePortChange()}</h3>
                                    <h3>{this.calculatePercentagePortChange()}</h3>
                                </div>
                            </div>
                            <div className="portfolio-line-graph">
                                <LineChart width={677} height={250} data={this.portfolioCalc()} margin={{ top: 5, right: 3, left: 0, bottom: 5 }}>
                                    <XAxis dataKey="label" hide={true} />
                                    <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                                    <Tooltip />
                                    <Line type="linear" dataKey="portValue" dot={false} stroke={this.color()} strokeWidth={2}/>
                                </LineChart>
                            </div>
                        </div>
                        <div className="portfolio-datarange">
                            <ul>
                                <li onClick={(e) => this.handleOnClick(e, "1m")}>1M</li>
                                <li onClick={(e) => this.handleOnClick(e, "3m")}>3M</li>
                                <li onClick={(e) => this.handleOnClick(e, "1y")}>1Y</li>
                                <li onClick={(e) => this.handleOnClick(e, "5y")}>5Y</li>
                            </ul>
                        </div>
                        <div>
                            <div className = "portfolio-news">
                                <h1>News</h1>
                            </div>
                            <ul className="portfolio-news-container">
                                {this.renderStockNews()}
                            </ul>
                        </div>
                    </div>
                    <div className="port-container">
                        <div className="portfolio-watchlist">
                            <div className="port">
                                <div className="table">
                                    <div className="table-row-header">
                                        <div className="table-row-header-cell">Portfolio</div>
                                        <div className="table-row-header-cell"></div>
                                        <div className="table-row-header-cell">...</div>
                                    </div>
                                    {this.renderPortfolioTableBody()}
                                    {this.renderWatchlistTableBody()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
    
}

export default HomeUser;