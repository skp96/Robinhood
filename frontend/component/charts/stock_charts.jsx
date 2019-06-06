import React from 'react' 
import StockGraph from '../charts/stock_graph_component'

class StockChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataRange: "1d"
        }
        this.handleOnClick1d = this.handleOnClick1d.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.renderChart = this.renderChart.bind(this)
    }


    handleOnClick1d(e, symbol) {
        e.preventDefault()
        this.props.fetchStockChartData1d(symbol)
        this.setState({dataRange: '1d'})
    }

    handleOnClick(e, symbol, range) {
        e.preventDefault()
        this.props.fetchStockChartData(symbol, range)
        this.setState({dataRange: range})
    }

    renderChart() {
        let graphData = []
        if (this.props.stock) {
            if (this.props.stock.chartData1d || this.props.stock.chartData) {
            graphData = this.state.dataRange === "1d" ? this.props.stock.chartData1d : this.props.stock.chartData
            }
        }
        return <StockGraph chartData={graphData} stockInfo={this.props.stock}/>
    }

    componentDidMount() {
        if (!this.props.stock) {
            const symbol = this.props.match.params.symbol
            this.props.fetchCompanyAndQuoteData(symbol).then(this.props.fetchStockChartData1d(symbol));
        }
    }

    render () {
        let stock = this.props.stock ? this.props.stock : {
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
        const symbol = this.props.match.params.symbol;
        return (
            <div className = "stock-chart">
                <ul>
                    <li><a>{stock.sector}</a></li>
                    <li><a>{stock.industry}</a></li>
                </ul>
                <div className="graph">
                    {this.renderChart()}
                </div>
                
                <div className="datarange">
                    <ul>
                        <li onClick={(e) => this.handleOnClick1d(e, symbol)}>1D</li>
                        <li onClick={(e) => this.handleOnClick(e, symbol, "1m")}>1M</li>
                        <li onClick={(e) => this.handleOnClick(e, symbol, "3m")}>3M</li>
                        <li onClick={(e) => this.handleOnClick(e, symbol, "1y")}>1Y</li>
                        <li onClick={(e) => this.handleOnClick(e, symbol, "5y")}>5Y</li>
                    </ul>
                </div>
                <div className="style-line"></div>
                
            </div>
        )
    }
}

export default StockChart;