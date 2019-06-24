class AddIndexToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_index :transactions, :portfolio_id
    add_index :transactions, :stock_id
  end
end
