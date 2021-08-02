class GamersController < ApplicationController

    def index
        gamers = Gamer.all
        render json: gamers
    end

    def show
        gamer = Gamer.find(params[:id])
        render json: gamer
    end

    def create
        gamer = Gamer.create(gamer_params)
        if gamer.valid?
            render json: gamer
        else
            render json: {message: gamer.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def gamer_params
        params.permit(:name, :email, :password)
    end

end
