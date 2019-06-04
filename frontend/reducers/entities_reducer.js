import { combineReducers } from 'redux';
import usersReducer from '../reducers/users_reducer';
import stocksReducer from '../reducers/stocks_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: stocksReducer
});

export default entitiesReducer;