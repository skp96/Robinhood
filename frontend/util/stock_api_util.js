
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
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote,company&token=sk_6bd49bdff71d4034a9ce14a28ad6fb89`
    })
}

export const fetchStocks = () => {
    return $.ajax ({
        method: 'GET',
        url: 'https://cloud.iexapis.com/stable/ref-data/symbols?token=sk_6bd49bdff71d4034a9ce14a28ad6fb89'
    })
}

export const fetchStockChartData = (symbol, range) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}?token=sk_6bd49bdff71d4034a9ce14a28ad6fb89`
    })
}

export const fetchStockChartData1d = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1d?token=sk_6bd49bdff71d4034a9ce14a28ad6fb89`
    })
}

export const fetchStockNews = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/3?token=sk_6bd49bdff71d4034a9ce14a28ad6fb89`
    })
}