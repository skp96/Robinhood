class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :symbol, null: false
      t.string :name, null: false
      t.datetime :created_at
      t.datetime :updated_at
    end

    add_index :stocks, :symbol, unique: true
  end
end
