class LogInController < ApplicationController

    def create
        gamer = Gamer.find_by(email: params[:gamer][:email])
        # byebug
        if gamer && gamer.authenticate(params[:gamer][:password])
            render json: {id: gamer.id, name: gamer.name}
        else
            render json: {error: ["invalid email and/or password"]}
        end
    end

end
