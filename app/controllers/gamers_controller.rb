class GamersController < ApplicationController
    # skip_before_action :authorize, only: :create

    def index
        gamers = Gamer.all
        render json: gamers
    end

    def show
        byebug
        gamer = Gamer.find(params[:id])
        render json: gamer
    end

    def get_games
        gamer = Gamer.find(params[:id])
        render json: gamer.games
    end

    def get_interests
        gamer = Gamer.find(params[:id])
        render json: gamer.interested_games
    end

    def create
        gamer = Gamer.create(gamer_params)
        if gamer.valid?
            session[:gamer_id] = gamer.id
            render json: gamer, status: :created
        else
            render json: {error: gamer.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def test
        byebug
    end

    private

    def gamer_params
        params.permit(:name, :email, :password)
    end

end
