import React from 'react'
import {LineChart, Line, XAxis, YAxis, Tooltip} from 'recharts'

class StockGraph extends React.Component {

    // color () {
    //     let colorData = this.props.chartData ? this.props.chartData : []

    //     let prices = [];
    //     let color = '#21ce99'
    //     for (var i = 0; i < colorData.length; i++) {
    //         prices.push(colorData[i].price)
    //     }

    //     if (prices[prices.length - 1] - prices[0] > 0) {
    //         color = '#21ce99'
    //     } else {
    //         color = '#F45531'
    //     }
    //     return color
    // }

    // calculateCurrPrice () {
    //     let currPrice = "$0.00"
    //     let chartData = this.props.chartData ? this.props.chartData : []

    //     let prices = []
    //     for (var i = 0; i < chartData.length; i++) {
    //         prices.push(chartData[i].price)
    //     }
    //     if (prices[prices.length - 1] > 0) {
    //         currPrice = `$${(prices[prices.length - 1])}`
    //     }
    //     return currPrice

    // }

    // calculatePriceChange () {
    //     let priceChange = "$0.00"

    //     let chartData = this.props.chartData ? this.props.chartData : []

    //     let prices = [];
    //     for (let i = 0; i < chartData.length; i++) {
    //         prices.push(chartData[i].price)
    //     }

    //     if (prices[prices.length - 1] - prices[0] > 0) {
    //         priceChange = `+$${((prices[prices.length - 1] - prices[0]).toFixed(2))}`
    //     } else {
    //         priceChange = `-$${((prices[prices.length -1] - prices[0]).toFixed(2)) * -1}`
    //     }
    //     return priceChange
    // }

    // calculatePercentPriceChange () {
    //     let percentagePriceChange = "[0.00%]"

    //     let chartData = this.props.chartData ? this.props.chartData : []

    //     let prices = [];
    //     for (let i = 0; i < chartData.length; i++) {
    //         prices.push(chartData[i].price)
    //     }

    //     percentagePriceChange = `${((((prices[prices.length - 1] - prices[0]) / prices[0]) * 100).toFixed(2))}%`

    //     return `[${percentagePriceChange}]`
    // }
    
    render () {
        
        // let chartData = this.props.chartData ? this.props.chartData : []
        // let stockInfo = this.props.stockInfo ? this.props.stockInfo : {
        //     name: "",
        //     about: "",
        //     ceo: "",
        //     industry: "",
        //     sector: "",
        //     exchange: "",
        //     marketCap: "",
        //     peRatio: "",
        //     close: "",
        //     avgVolume: "",
        //     high: "",
        //     low: "",
        //     open: "",
        //     volume: "",
        //     week52High: "",
        //     week52Low: "",
        //     changePercent: "",
        //     previousClose: "",
        // }

        // if (!stockInfo.name) {return null}
        
        return (
        <div className="graph">
            {/* <div className="graph-fin-metrics">
                <h1>{stockInfo.name.replace(/Inc.|Corporation|\(The\)/gi, '')}</h1>
                <h2>{this.calculateCurrPrice()}</h2>
                <div className="metric-changes">
                    <h3>{this.calculatePriceChange()}</h3>
                    <h3>{this.calculatePercentPriceChange()}</h3>
                </div>
            </div>
            
            <div className="line-graph">
                <LineChart width={677} height={250} data={chartData} margin={{top: 5, right: 3, left: 0, bottom: 5}}>
                    <XAxis dataKey="label" hide={true} />
                    <YAxis hide={true} domain={['dataMin', 'dataMax']}/>
                    <Tooltip />
                        <Line type="linear" dataKey="price" dot={false} stroke={this.color()} strokeWidth={2}/>
                </LineChart>
            </div>
         */}
        </div>

        )
    }
}

export default StockGraph