class AddRatingToGames < ActiveRecord::Migration[6.1]
  def change
    add_column :games, :rating, :float
  end
end
