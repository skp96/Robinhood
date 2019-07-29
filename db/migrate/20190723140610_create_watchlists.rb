class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.integer :user_id, null: false
      t.datetime :created_at
      t.datetime :updated_at
    end
    add_index :watchlists, :user_id, unique: true
  end
end
