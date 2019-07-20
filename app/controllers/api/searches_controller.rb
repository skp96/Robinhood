class Api::SearchesController < ApplicationController

    def show 
        if params[:id] == ""
            @searches = []
        else
            str = "%#{params[:id]}%"
            @searches = Stock.where("symbol LIKE UPPER(:query)", query: str ).limit(6)
        end
        render :show
    end
end