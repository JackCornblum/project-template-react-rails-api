class CommentSerializer < ActiveModel::Serializer
  attributes :id, :gamer_id, :game_id, :comment
end
