import { combineReducers } from 'redux';
import usersReducer from '../reducers/users_reducer';
import stocksReducer from '../reducers/stocks_reducer';
import transactionsReducer from '../reducers/transactions_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer,
    transactions: transactionsReducer
});

export default entitiesReducer;