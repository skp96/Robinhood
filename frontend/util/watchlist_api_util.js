export const fetchWatchlist = (userId) => {
    return $.ajax({
        method: 'GET',
        url: `api/watchlists/${userId}`
    })
}

export const addToWatchlist = (symbol) => {
    return $.ajax({
        method: 'PATCH',
        url: `api/watchlists/${symbol}`
    })
}

export const removeFromWatchlist = (symbol) => {
    return $.ajax({
        method: 'DELETE',
        url: `api/watchlists/${symbol}`
    })
}