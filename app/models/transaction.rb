# == Schema Information
#
# Table name: transactions
#
#  id             :bigint           not null, primary key
#  portfolio_id   :integer          not null
#  stock_id       :integer          not null
#  purchase_price :integer          not null
#  shares         :integer          not null
#

class Transaction < ApplicationRecord
    validates :portfolio_id, :stock_id, :purchase_price, :shares, presence: true

    belongs_to :portfolio
    belongs_to :stock
end
