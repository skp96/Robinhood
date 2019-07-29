import * as WatchlistApiUtil from '../util/watchlist_api_util'

export const RECEIVE_WATCHLIST = 'RECEIVE_WATCHLIST'

const receiveWatchlist = (watchlist) => {
    return {
        type: RECEIVE_WATCHLIST,
        watchlist: watchlist
    }
}

export const fetchWatchlist = (userId) => {
    return (dispatch) => {
        return WatchlistApiUtil.fetchWatchlist(userId).then(watchlist => {
            return dispatch(receiveWatchlist(watchlist))
        })
    }
}

export const addToWatchlist = (symbol) => {
    return (dispatch) => {
        return WatchlistApiUtil.addToWatchlist(symbol).then(watchlist => {
            return dispatch(receiveWatchlist(watchlist))
        })
    }
}

export const removeFromWatchlist = (symbol) => {
    return (dispatch) => {
        return WatchlistApiUtil.removeFromWatchlist(symbol).then(watchlist => {
            return dispatch(receiveWatchlist(watchlist))
        })
    }
}