# == Schema Information
#
# Table name: portfolios
#
#  id      :bigint           not null, primary key
#  user_id :integer          not null
#

class Portfolio < ApplicationRecord
    validates :user_id, presence: true

    belongs_to :user

    has_many :portfolio_joins,
        foreign_key: :portfolios_id,
        class_name: :PortfolioJoin


    has_many :stocks,
        through: :portfolio_joins,
        source: :stock

    has_many :transactions

    def current_stocks
        
        shares = self.portfolio_joins
        
        stocks = self.stocks

        
        curr_stocks = []

        shares.each do |share|
            hash = {}
            stocks.each do |stock|
                if stock.id == share.stocks_id
                    hash[stock.symbol] = share.shares
                end
            end
            curr_stocks << hash
        end
        curr_stocks
    end
end
