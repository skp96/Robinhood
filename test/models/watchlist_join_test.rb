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

require 'test_helper'

class WatchlistJoinTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
