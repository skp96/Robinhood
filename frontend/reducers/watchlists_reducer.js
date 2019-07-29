import { RECEIVE_WATCHLIST } from '../actions/watchlist_actions'
import { merge } from 'lodash'

const watchlistsReducer = (oldState = [], action) => {
    Object.freeze(oldState)

    switch(action.type) {
        case RECEIVE_WATCHLIST:
            return action.watchlist
        default: 
            return oldState;
    }
}

export default watchlistsReducer