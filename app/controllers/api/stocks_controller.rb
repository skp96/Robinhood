class StocksController < ApplicationController

    def index 
        @stock = Stock.all
        render 'api/stocks/index'
    end

    def show 
        @stock = Stock.find(params[:symbol])
        render 'api/stocks/show'
    end

    private 
    def stock_params
        params.require(:stock).permit(:symbol, :name)
    end
end