class InterestedGamesController < ApplicationController
    def index
        games = InterestedGame.all
        render json: games
    end

    def show
        game = InterestedGame.find(params[:id])
        render json: game
    end

    def create
        game = InterestedGame.new(game_params)

        if game.save
            render json: game
        else
            render json: {errors: game.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        game = InterestedGame.find(params[:id])
        gamer = game.gamer
        game.destroy
        games = gamer.interested_games

        render json: games
    end

    def destroyer
        game = InterestedGame.find(params[:id])
        game.destroy

        render json: game
    end

    private

    def game_params
        params.require(:interested_game).permit(:gamer_id, :name, :image, :genre)
    end

end
