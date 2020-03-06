class Api::StocksController < ApplicationController
    
    def index 
        @stocks = Stock.all
        render 'api/stocks/index'
    end

    def show 
        @stock = Stock.find_by(symbol: params[:symbol])
        render 'api/stocks/show'
    end

    private 
    def stock_params
        params.require(:stock).permit(:symbol, :name)
    end
end