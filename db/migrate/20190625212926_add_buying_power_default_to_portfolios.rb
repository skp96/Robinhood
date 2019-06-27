class AddBuyingPowerDefaultToPortfolios < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :buying_power, :integer, null: false, default: 1000000
  end
end
