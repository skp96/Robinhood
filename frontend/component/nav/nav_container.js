import { connect } from 'react-redux'
import { searchStocks } from '../../actions/portfolio_actions'
import { logout } from '../../actions/session_actions'
import NavBarUser from './nav_bar_user';

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        stocks: state.entities.stocks
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        searchStocks: (query) => dispatch(searchStocks(query)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBarUser)