class API::SearchesController < ApplicationController
    def show 
        if params[:id] == ""
            @searches = []
        else
            str = "%#{params[:id]}%"
            @searches = Stocks.where("stocks.symbols LIKE UPPER(:query)", query: str )
        end
        render :show
    end
end