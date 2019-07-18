export const getStock = (stock) => {
    return $.ajax ({
        method: 'GET',
        url: `api/stocks/${stock.symbol}`
    });
}

export const fetchCompanyAndQuoteData = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${symbol}&types=quote,company&token=sk_2694044421a2448b890da40e817a5833`
    });
}

export const getAllStocks = () => {
    return $.ajax ({
        method: 'GET',
        url: 'api/stocks'
    });
}

export const fetchStockChartData = (symbol, range) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/${range}?token=sk_2694044421a2448b890da40e817a5833`
    });
}

export const fetchStockChartData1d = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1d?token=sk_2694044421a2448b890da40e817a5833`
    });
}

export const fetchStockNews = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://cloud.iexapis.com/stable/stock/${symbol}/news/last/3?token=sk_2694044421a2448b890da40e817a5833`
    });
}