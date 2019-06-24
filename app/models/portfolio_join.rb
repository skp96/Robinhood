# == Schema Information
#
# Table name: portfolio_joins
#
#  id            :bigint           not null, primary key
#  portfolios_id :bigint
#  stocks_id     :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shares        :integer          not null
#

class PortfolioJoin < ApplicationRecord
  validates :portfolios_id, :stocks_id, :shares, presence: true
  validates :portfolios_id, uniqueness: {scope: :stocks_id}

  belongs_to :portfolio,
    foreign_key: :portfolios_id,
    class_name: :Portfolio

  belongs_to :stock,
    foreign_key: :stocks_id,
    class_name: :Stock
end
