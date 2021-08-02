class InterestedGame < ApplicationRecord
    belongs_to :gamer

    validates :name, presence:true, uniqueness:true
    validates :image, presence:true
    validates :genre, presence:true
end
