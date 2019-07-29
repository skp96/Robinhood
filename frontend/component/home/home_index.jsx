import React from 'react';
import HomeUser from './home_user'
import HomeNoUser from './home_no_user'

class HomeIndex extends React.Component {
    
    render () {
        const { logout, currentUser, portfolio, fetchPortfolio, fetchPortfolioStockPricesAndNews, fetchPortfolioStockChartData, fetchTransactions, transactions, watchlist, fetchWatchlist } = this.props
        
        if(currentUser) {
            return (
                <HomeUser logout={logout} currentUser={currentUser} portfolio={portfolio} watchlist={watchlist} transactions={transactions} fetchPortfolio={fetchPortfolio} fetchPortfolioStockPricesAndNews={fetchPortfolioStockPricesAndNews} fetchPortfolioStockChartData={fetchPortfolioStockChartData} fetchTransactions={fetchTransactions} fetchWatchlist={fetchWatchlist} />
            )
        } else {
            return (
                <HomeNoUser login={this.props.login} />
            )
        }
    }
}

export default HomeIndex;