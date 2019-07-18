import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Transactions from './transactions'
import { fetchCompanyAndQuoteData, fetchStockChartData1d } from '../../actions/stock_actions'
import {getStock} from '../../actions/stock_actions'
import {createTransaction} from '../../actions/transaction_action'
import {fetchPortfolio} from "../../actions/portfolio_actions"

const mapStateToProps = (state, ownProps) => {

    return {
        currentUser: state.entities.users[state.session.id],
        stock: state.entities.stocks[ownProps.match.params.symbol],
        portfolio: state.entities.portfolios
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompanyAndQuoteData: (symbol) => dispatch(fetchCompanyAndQuoteData(symbol)),
        fetchStockChartData1d: (symbol) => dispatch(fetchStockChartData1d(symbol)),
        createTransaction: (transaction) => dispatch(createTransaction(transaction)),
        fetchPortfolio: (portfolioId) => dispatch(fetchPortfolio(portfolioId)),
        getStock: (stock) => dispatch(getStock(stock)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Transactions))