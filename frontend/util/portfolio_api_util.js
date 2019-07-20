export const fetchPortfolio = (id) => {
    return $.ajax ({
        method: "GET",
        url: `api/portfolios/${id}`
    });
}

export const fetchPortfolioStockPricesAndNews = (symbols) => {
    let securities = symbols.join(",")
    return $.ajax ({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${securities}&types=quote,news&token=sk_2694044421a2448b890da40e817a5833`
    })
}

export const fetchPortfolioStockChartData = (symbols, range) => {
    let securities = symbols.join(",")
    return $.ajax ({
        method: "GET",
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${securities}&types=chart&range=${range}&token=sk_2694044421a2448b890da40e817a5833`
    })
}

export const searchStocks = (query) => {
    return $.ajax({
        method: "GET",
        url: `api/searches/${query}`
    })
}