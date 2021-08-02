class Game < ApplicationRecord
    belongs_to :gamer
    has_many :comments

    validates :name, presence: true
    validates :name, uniqueness: true
    validates :image, presence:true
    validates :genre, presence:true
    
end
