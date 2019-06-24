import {
    // RECEIVE_TRANSACTION,
    RECEIVE_TRANSACTIONS
} from '../actions/transaction_action'
import {merge} from 'lodash'

const transactionsReducer = (oldState = {}, action) => {
    Object.freeze(oldState)
    let newState = merge({}, oldState)

    switch(action.type) {

        case RECEIVE_TRANSACTIONS:
            return action.transactions
        default:
            return oldState
    }
}

export default transactionsReducer