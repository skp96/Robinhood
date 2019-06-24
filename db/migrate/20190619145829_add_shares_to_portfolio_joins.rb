class AddSharesToPortfolioJoins < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolio_joins, :shares, :integer
  end
end
