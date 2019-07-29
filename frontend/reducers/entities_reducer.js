import { combineReducers } from 'redux';
import usersReducer from '../reducers/users_reducer';
import stocksReducer from '../reducers/stocks_reducer';
import transactionsReducer from '../reducers/transactions_reducer';
import portfoliosReducer from '../reducers/portfolios_reducer'
import watchlistsReducer from '../reducers/watchlists_reducer'

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer,
    transactions: transactionsReducer,
    portfolios: portfoliosReducer,
    watchlists: watchlistsReducer,
});

export default entitiesReducer;