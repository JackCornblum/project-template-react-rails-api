class InterestedGameSerializer < ActiveModel::Serializer
  attributes :id, :gamer_id, :name, :image, :genre
end
