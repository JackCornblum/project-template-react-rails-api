class GamersController < ApplicationController
    skip_before_action :authorize, only: :create

    def index
        gamers = Gamer.all
        render json: gamers
    end

    def show
        gamer = Gamer.find(params[:id])
        render json: gamer
    end

    def get_games
        gamer = Gamer.find(params[:id])
        render json: gamer.games
    end

    def create
        gamer = Gamer.create!(gamer_params)
        session[:gamer_id] = gamer.id
        render json: gamer, status: :created
    end

    private

    def gamer_params
        params.permit(:name, :email, :password)
    end

end
