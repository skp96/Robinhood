class Removeshare < ActiveRecord::Migration[5.2]
  def change
    remove_column :portfolio_joins, :shares
  end
end
