class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :gamer_id
      t.string :name
      t.string :image
      t.string :genre
      t.float :time_played
      t.boolean :completed

      t.timestamps
    end
  end
end
