
export const getAllStocks = () => {
    return $.ajax ({
        method: 'GET',
        url: 'api/stocks'
    });
}

// request not working, need to fix
export const getStock = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `api/stocks/${symbol}`
    })
}

export const fetchCompanyAndQuoteData = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbol}&types=quote,company`
    })
}

export const fetchStocks = () => {
    return $.ajax ({
        method: 'GET',
        url: 'https://api.iextrading.com/1.0/ref-data/symbols'
    })
}

export const fetchStockChartData = (symbol, range) => {
    return $.ajax ({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`
    })
}

export const fetchStockChartData1d = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${symbol}/chart/1d`
    })
}

export const fetchStockNews = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/3?token=sk_6bd49bdff71d4034a9ce14a28ad6fb89`
    })
}