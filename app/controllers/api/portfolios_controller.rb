class API::PortfoliosController < ApplicationController

    def show 
        
        @portfolio = current_user.portfolio

        if @portfolio
            render 'api/portfolios/show'
        else
            render json @portfolio.errors.full_messages, status: 404
        end
    end

    private 
    def portfolio_params 
        params.require(:portfolio).permit(:user_id)
    end

end