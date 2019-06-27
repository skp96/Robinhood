import React from 'react';
import NavBarUser from '../nav/nav_bar_user'
import { Link } from 'react-router-dom';
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts'

class HomeUser extends React.Component {
    
    componentDidMount() {
        const { currentUser, fetchPortfolio, fetchPortfolioStockPricesAndNews, fetchPortfolioStockChartData } = this.props
            fetchPortfolio(currentUser.portfolio.id).then(data => {
                let symbols = data.portfolio.currentPortfolio.map(object => {
                    return (Object.keys(object))
                })
                
                fetchPortfolioStockPricesAndNews(symbols).then(() => {
                    fetchPortfolioStockChartData(symbols, "1M")
                })
                
            })
    }

    portfolioCalc() {
        const {chart, stockData, currentPortfolio} = this.props.portfolio
        const {portfolio_value} = this.props.currentUser.portfolio 

        let data = chart ? chart : []
        let equityValues = stockData ? stockData : []
        let portfolio = currentPortfolio ? currentPortfolio : []
        let placeholder = [{"label": "", "portValue": ""}]

        if (data.length != 0) {
            let portfolioValue = portfolio_value

            equityValues.forEach((equity, i) => {
                return portfolioValue += (portfolio[i][equity["ticker"]] * equity["price"])
            })

            let initialChartData = data[0]
            let remainingChartData = data.slice(1)
            let finalData = []

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
                            secondTempPv *=  Number(otherticker.change)
                            hash["label"] = firstTime
                            hash["portValue"] += Number(secondTempPv.toFixed(2))
                        }
                        portfolioValue = secondTempPv
                    }
                    l++
                }
                finalData.push(hash)
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
            const newsData = news.map((obj,idx) => {
                return (
                    <li key={idx}>
                        <a href={obj.news[0].url} className="portfolio-news-item">
                            <img src={obj.news[0].image} width="200" height="200" className="portfolio-news-image" />
                            <div className="portfolio-news-content">
                                <h3>{obj.news[0].source}</h3>
                                <h4>{obj.news[0].headline}</h4>
                            </div>
                        </a>
                    </li>
                )
            })
            return newsData
        } else {
            return news
        }
    }

    renderTableBody() {
        const {currentPortfolio, stockData} = this.props.portfolio
        let stocks = currentPortfolio ? currentPortfolio : []
        let prices = stockData ? stockData : []

        if (prices.length != 0 && stocks.length != 0) {
            let finalData = []

            for (let i = 0; i < stocks.length; i++) {
                let newObj = {}
                let stockObj = stocks[i]
                let stockprice = prices[i].price
                newObj["ticker"] = Object.keys(stockObj).join("")
                newObj["price"] = stockprice
                finalData.push(newObj)
            }
            const tableBody = finalData.map(obj => {
                return (
                        <tr>
                            <td align="left">{obj.ticker}</td>
                            <td align="right">${obj.price}</td>
                        </tr>
                )
            })
            return tableBody
        } else {
            return (
                <tr></tr>
            )
        }

    }
    
    render() {
        // const {currentPortfolio, stockData, chart} = this.props.portfolio
        // let portfolio = currentPortfolio ? currentPortfolio : []
        // let securitiesData = stockData ? stockData : []
        // let chartData = chart ? chart : []
        return (
            <>
                <div className="main-user">
                    <div className="nav-bar">
                        <NavBarUser logout={this.props.logout} />
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
                                    <Line type="linear" dataKey="portValue" dot={false} stroke={this.color()} strokeWidth={2} />
                                </LineChart>
                            </div>
                        </div>
                        <div className="portfolio-datarange">
                            <ul>
                                <li onClick={(e) => this.handleOnClick(e, "1d")}>1D</li>
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
                                <table className="portfolio-table">
                                    <thead>
                                        <tr>
                                            <th align="left" className="portfolio-header">Portfolio</th>
                                            <th align="right">...</th>
                                        </tr>
                                    </thead>

                                    <tbody id="table-body">
                                        {this.renderTableBody()}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
    
}

export default HomeUser;