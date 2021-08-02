class CreateInterestedGames < ActiveRecord::Migration[6.1]
  def change
    create_table :interested_games do |t|
      t.integer :gamer_id
      t.string :name
      t.string :image
      t.string :genre

      t.timestamps
    end
  end
end
