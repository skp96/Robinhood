class Api::StocksController < ApplicationController

    # def create
    #     @stock = Stock.new(stock_params)
    #     if @stock.save
    #         render 'api/stocks/show'
    #     else
    #         render json: @stock.errors.full_messages, status: 422
    #     end
    # end
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