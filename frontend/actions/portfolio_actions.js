import * as PortfolioApiUtil from '../util/portfolio_api_util'

export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO"


const receivePortfolio = (portfolio) => {
    return {
        type: RECEIVE_PORTFOLIO,
        portfolio: portfolio,
    }
}

export const fetchPortfolio = (portfolioId) => {
    return (dispatch) => {
        return PortfolioApiUtil.fetchPortfolio(portfolioId).then(portfolio => {
            return dispatch(receivePortfolio(portfolio))
        })
    };
}
