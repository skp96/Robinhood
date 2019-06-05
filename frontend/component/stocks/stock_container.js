import {connect} from 'react-redux'
import Stock from './stock'


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
        fetchStockNews: (symbol) => dispatch(fetchStockNews(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)