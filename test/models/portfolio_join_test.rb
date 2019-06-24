# == Schema Information
#
# Table name: portfolio_joins
#
#  id            :bigint           not null, primary key
#  portfolios_id :bigint
#  stocks_id     :bigint
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  shares        :integer          not null
#

require 'test_helper'

class PortfolioJoinTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
