class RemoveIndexFromTransactions < ActiveRecord::Migration[5.2]
  def change
    remove_index :transactions, :portfolio_id
    remove_index :transactions, :stock_id
  end
end
