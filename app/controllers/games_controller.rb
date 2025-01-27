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

        gamer = Gamer.find(game[:gamer_id])
        games = gamer.games

        render json: games

    end

    def update_time_played
        game = Game.find(params[:id])
        game[:time_played] = params[:time_played]
        game.save

        gamer = Gamer.find(game[:gamer_id])
        games = gamer.games
        
        render json: games
    end

    def get_comments
        game = Game.find(params[:id])
        content = game.comments
        render json: content
    end

    def gamesplayed
        games = Game.all.sample(10)
        render json: games
    end

    def update_rating
        game = Game.find(params[:id])
        game[:rating] = params[:rating]
        game.save

        gamer = Gamer.find(game[:gamer_id])
        games = gamer.games
        
        render json: games
    end

    def destroy
        game = Game.find(params[:id])
        game.destroy

        render json: game
    end

    private

    def game_params
        # byebug
        params.require(:game).permit(:gamer_id, :name, :image, :genre, :time_played, :completed, :rating)
    end

    def form_params
        # byebug
        params.permit(:time_played)
    end
end

# gamer_id: 2,
# name: "Duke Nukem",
# image: "https://assets2.rockpapershotgun.com/duke-nukem-3d-world-tour.jpg/BROK/resize/1920x1920%3E/format/jpg/quality/80/duke-nukem-3d-world-tour.jpg",
# genre: "Roleplaying",
# time_played: 0,
# completed: true,