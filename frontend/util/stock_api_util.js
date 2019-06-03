
export const getAllStocks = () => {
    return $.ajax ({
        method: 'GET',
        url: 'api/stocks'
    });
}

export const getStock = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `api/stocks/${symbol}`
    })
}

export const fetchCompanyData = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${symbol}/company`
    })
}

export const fetchStockQuote = (symbol) => {
    return $.ajax ({
        method: 'GET',
        url: `https://api.iextrading.com/1.0/stock/${symbol}/quote`
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
        url: `https://api.iextrading.com/1.0/stock/market/batch?symbols=${symbol}&types=chart&range=${range}`
    })
}

export const fetchStockNews = (name) => {
    return $.ajax ({
        method: 'GET',
        url: `https://newsapi.org/v2/everything?q=${name}&sortBy=popularity&apiKey=5702d83683344135acefee6c911504bb&language=en&domains=wsj.com,cnbc.com,finance.yahoo.com,seekingalpha.com`
    })
}