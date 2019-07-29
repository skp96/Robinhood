# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  user_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class Watchlist < ApplicationRecord
    validates :user_id, presence: true

    belongs_to :user

    has_many :watchlist_joins,
        foreign_key: :watchlists_id,
        class_name: :WatchlistJoin

    has_many :stocks,
        through: :watchlist_joins,
        source: :stock
end
