class Api::WatchlistsController < ApplicationController 

    def show
        @current_watchlist = current_user.watchlist.stocks

        if @current_watchlist 
            render 'api/watchlists/show'
        else
        end
    end

    def update
        @stock = Stock.find_by(symbol: params[:id])
        @watchlist = current_user.watchlist

        WatchlistJoin.create(stocks_id: @stock.id, watchlists_id: @watchlist.id)
        
        render 'api/watchlists/show'
    end

    def destroy
        @stock = Stock.find_by(symbol: params[:id])

        @watchlist_join = WatchlistJoin.find_by(stocks_id: @stock.id)

        @watchlist_join.destroy

        render 'api/watchlists/show'
    end

    private 

    def watchlist_params
        params.require(:watchlist).permit(:id)
    end
end