# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  fname           :string           not null
#  lname           :string           not null
#  email           :string           not null
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime
#  updated_at      :datetime
#

class Users < ApplicationRecord
    validates :fname, :lname, :email, :username, :session_token, presence: true
    validates :password, length: {minimum: 7}, allow_nil: true
end
