class Api::PortfolioJoinsController < ApplicationController

    def create
        @portfolio_join = PortfolioJoin.new(portfolio_joins_params)

        if @portfolio_join.save 
            render 'api/portfolio_joins/show'
        else
            render json: @portfolio_join.errors.full_messages, status: 422
        end
    end

    def update
        @portfolio_join = PortfolioJoin.find_by_portfolios_id!(params[:portfolios_id])

        if @portfolio_join
            @portfolio_join.update_attribute(params[:shares])
            render 'api/porfolio_joins/show'
        else
            render json: @portfolio_join.errors.full_messages, status: 422
    end

    def destroy
        @portfolio_join = PorfolioJoin.find_by_portfolios_id!(params[:portfolios_id])
        @portfolio_join.destroy
    end

    private 
    def portfolio_joins_params
        params.require(:portfolio_join).permit(:portfolios_id, :stocks_id, :shares)
    end
end