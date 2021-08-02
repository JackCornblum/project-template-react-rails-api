class SessionsController < ApplicationController

    def create
        gamer = Gamer.find_by(email: params[:gamer][:email])
        # byebug
        if gamer && gamer.authenticate(params[:gamer][:password])
            session[:gamer_id] = gamer.id
            render json: {id: gamer.id, name: gamer.name}
        else
            render json: {error: ["invalid email and/or password"]}
        end
    end

    def show
        gamer = Gamer.find_by(id: session[:gamer_id])

        if gamer
            render json: {id: gamer.id, name: gamer.name}
        else
            render json: {message: ["no user signed in"]}
        end
    end

    def destroy
        session.delete :gamer_id
        head :no_content
    end

end
