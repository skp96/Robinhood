export const createPortJoin = (portfolioJoin) => {
    return $.ajax({
        method: 'POST',
        url: 'api/portfolio_joins',
        data: {portfolioJoin}
    });
}

export const updatePortJoin = (portfolioJoin) => {
    return $.ajax({
        method: 'GET',
        url: `api/portfolio_joins/${portfolioJoin.portfolios_id}`,
        data: {portfolioJoin}
    });
}

export const deletePortJoin = (portfoliosId) => {
    return $.ajax({
        method: 'GET',
        url: `api/portfolio_joins/${portfoliosId}`
    })
}