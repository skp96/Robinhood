# == Schema Information
#
# Table name: watchlist_joins
#
#  id            :bigint           not null, primary key
#  stocks_id     :bigint
#  watchlists_id :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class WatchlistJoin < ApplicationRecord
  validates :watchlists_id, :stocks_id, presence: true
  validates :watchlists_id, uniqueness: {scope: :stocks_id}

  belongs_to :stock,
    foreign_key: :stocks_id,
    class_name: :Stock

  belongs_to :watchlist,
    foreign_key: :watchlists_id,
    class_name: :Watchlist

  
end
