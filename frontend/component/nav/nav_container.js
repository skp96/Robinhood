import { connect } from 'react-redux'
import { getAllStocks } from '../../actions/stock_actions'
import { logout } from '../../actions/session_actions'
import NavBarUser from './nav_bar_user';

const mapStateToProps = (state) => {
    return {
        stocks: state.entities.stocks
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllStocks: () => dispatch(getAllStocks()),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarUser)