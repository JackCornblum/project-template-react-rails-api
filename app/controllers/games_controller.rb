class GamesController < ApplicationController

    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find(params[:id])
        render json: game
    end

    def create
        game = Game.new(game_params)

        if game.save
            render json: game
        else
            render json: {errors: game.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def update

        game = Game.find(params[:id])
        game[:completed] = true
        game.save

        render json: Game.all

    end
    private

    def game_params
        params.require(:game).permit(:gamer_id, :name, :image, :genre, :time_played, :completed)
    end
end

# gamer_id: 2,
# name: "Duke Nukem",
# image: "https://assets2.rockpapershotgun.com/duke-nukem-3d-world-tour.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/duke-nukem-3d-world-tour.jpg",
# genre: "Roleplaying",
# time_played: 0,
# completed: true,