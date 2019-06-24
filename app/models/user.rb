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

class User < ApplicationRecord
    validates :fname, :lname, :email, :username, :session_token, presence: true
    validates :username, :session_token, uniqueness: true
    validates :password, length: {minimum: 7}, allow_nil: true

    has_one :portfolio

    has_many :portfolio_joins,
        through: :portfolio,
        source: :portfolio_joins


    has_many :transactions,
        through: :portfolio,
        source: :transactions
    
    after_initialize :ensure_session_token
    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user && user.is_password?(password) ? user : nil
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password) 
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        self.save!
        self.session_token
    end

    private 
    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end
end
