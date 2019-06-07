import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Transactions from './transactions'
import { fetchCompanyAndQuoteData, fetchStockChartData1d } from '../../actions/stock_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.entities.users[state.session.id],
        stock: state.entities.stocks[ownProps.match.params.symbol],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompanyAndQuoteData: (symbol) => dispatch(fetchCompanyAndQuoteData(symbol)),
        fetchStockChartData1d: (symbol) => dispatch(fetchStockChartData1d(symbol))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transactions))