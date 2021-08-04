class InterestedGame < ApplicationRecord
    belongs_to :gamer

    validates :name, presence:true
    validates :image, presence:true
    validates :genre, presence:true
end
