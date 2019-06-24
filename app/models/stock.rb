# == Schema Information
#
# Table name: stocks
#
#  id         :bigint           not null, primary key
#  symbol     :string           not null
#  name       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class Stock < ApplicationRecord
    validates :symbol, :name, presence: true
    validates :symbol, uniqueness: true

    has_many :portfolio_joins,
        foreign_key: :stocks_id,
        class_name: :PortfolioJoin
    
    has_many :portfolios,
        through: :portfolio_joins,
        source: :portfolio

    has_many :transactions
end
