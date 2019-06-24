class CreatePortfolioJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_joins do |t|
      t.references :portfolios, foreign_key: true
      t.references :stocks, foreign_key: true

      t.timestamps
    end
  end
end
