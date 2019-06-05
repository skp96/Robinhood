import {connect} from 'react-redux';
import {
    fetchStockChartData,
    fetchStockChartData1d,
    fetchCompanyAndQuoteData,
} from '../../actions/stock_actions'

import {withRouter} from 'react-router-dom' 

import StockChart from '../charts/stock_charts'

const mapStateToProps = (state, ownProps) => {
    return {
        stock: state.entities.stocks[ownProps.match.params.symbol]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStockChartData1d: (symbol) => dispatch(fetchStockChartData1d(symbol)),
        fetchStockChartData: (symbol, range) => dispatch(fetchStockChartData(symbol, range)),
        fetchCompanyAndQuoteData: (symbol) => dispatch(fetchCompanyAndQuoteData(symbol)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StockChart))