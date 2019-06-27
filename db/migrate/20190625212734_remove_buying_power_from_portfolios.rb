class RemoveBuyingPowerFromPortfolios < ActiveRecord::Migration[5.2]
  def change
    remove_column :portfolios, :buying_power
  end
end
