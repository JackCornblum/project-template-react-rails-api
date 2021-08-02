class CommentsController < ApplicationController

    def index
        comments = Comment.all
        render json: comments
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment
    end

    def create
        comment = Comment.new(comment_params)

        if comment.save
            render json: comment
        else
            render json: {errors: comment.errors.full_messages}, status: :unprocessable_entity
        end
    end

    private

    def comment_params
        params.permit(:gamer_id, :game_id, :comment)
    end
end