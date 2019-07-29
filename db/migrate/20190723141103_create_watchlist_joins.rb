class CreateWatchlistJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlist_joins do |t|
      t.references :stocks, foreign_key: true
      t.references :watchlists, foreign_key: true

      t.timestamps
    end
  end
end
