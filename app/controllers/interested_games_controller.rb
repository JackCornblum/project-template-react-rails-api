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

    private

    def game_params
        params.permit(:gamer_id, :name, :image, :genre)
    end
end
end
