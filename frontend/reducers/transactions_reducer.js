import {
    RECEIVE_TRANSACTION,
    RECEIVE_TRANSACTIONS
} from '../actions/transaction_action'
import {merge} from 'lodash'

const transactionsReducer = (oldState = {}, action) => {
    Object.freeze(oldState)

    switch(action.type) {

        case RECEIVE_TRANSACTIONS:
            return merge({}, oldState, action.transactions)
        case RECEIVE_TRANSACTION:
            return merge({}, oldState, action.transaction)
        default:
            return oldState
    }
}

export default transactionsReducer