class Gamer < ApplicationRecord
    has_secure_password
    has_many :games
    has_many :comments
    has_many :interested_games

    validates :name, presence: true
    validates :email, presence: true, uniqueness: true
    validates :password, presence: true
end
