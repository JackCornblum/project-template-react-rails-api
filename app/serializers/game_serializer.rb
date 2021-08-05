class GameSerializer < ActiveModel::Serializer
  attributes :id, :gamer_id, :name, :image, :genre, :time_played, :completed, :rating
end
