import {RECEIVE_CURRENT_USER} from '../actions/session_actions';
import { RECEIVE_TRANSACTION} from '../actions/transaction_action'
import {LOGOUT_CURRENT_USER} from '../actions/session_actions'
import {merge} from 'lodash'

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    let newState = merge({}, oldState)
    
    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return {[action.currentUser.id]: action.currentUser}
        case RECEIVE_TRANSACTION:
            let buyingPower = newState[action.transaction.user_id.id]["portfolio"]["buying_power"]
            let value = action.transaction.price * action.transaction.shares
            let newBuyingPower = buyingPower + (value * -1)

            newState[action.transaction.user_id.id]["portfolio"]["buying_power"] = newBuyingPower
            return newState
        case LOGOUT_CURRENT_USER:
            return {}
        default:
            return oldState;
    }
}

export default usersReducer;