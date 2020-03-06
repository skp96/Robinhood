class Api::TransactionsController < ApplicationController

    def create 
        @transaction = Transaction.new(transaction_params)
        
        if @transaction.save
            @transactions = Transaction.where(params[:portfolio_id])
            @portfolio_join = PortfolioJoin.find_by(portfolios_id: @transaction.portfolio_id, stocks_id: @transaction.stock_id)
    
            if @portfolio_join
            
                if @portfolio_join.shares + @transaction.shares == 0        
                    @portfolio_join.destroy
                
                elsif @portfolio_join.shares + @transaction.shares != 0
                    @portfolio_join.update_attribute(:shares, @portfolio_join.shares + @transaction.shares)
                end
            else
                @portfolio_join = PortfolioJoin.create(portfolios_id: @transaction.portfolio_id, stocks_id: @transaction.stock_id, shares: @transaction.shares)
            end
            value = (@transaction.shares * @transaction.purchase_price) * -1
            @portfolio = current_user.portfolio
            new_buying_power = @portfolio.buying_power + value
            @portfolio.update(buying_power: new_buying_power)
            @stock = Stock.find_by(id: @transaction.stock_id)
            render 'api/transactions/show'
        else
            render json: @transaction.errors.full_messages, status: 422
        end
    end

    def index 
        @transactions = Transaction.where(params[:portfolio_id])
        render 'api/transactions/index'
    end


    private
    def transaction_params
        params.require(:transaction).permit(:portfolio_id, :stock_id, :purchase_price, :shares)
    end

end
