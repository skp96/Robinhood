import {connect} from 'react-redux'
import Stock from './stock'
import {logout} from '../../actions/session_actions'


import {
    fetchCompanyAndQuoteData,
    fetchStockNews
} from '../../actions/stock_actions'

const mapStateToProps = (state, ownProps) => {
    return {
        currentUser: state.entities.users[state.session.id],
        stock: state.entities.stocks[ownProps.match.params.symbol],
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCompanyAndQuoteData: (symbol) => dispatch(fetchCompanyAndQuoteData(symbol)),
        fetchStockNews: (symbol) => dispatch(fetchStockNews(symbol)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)