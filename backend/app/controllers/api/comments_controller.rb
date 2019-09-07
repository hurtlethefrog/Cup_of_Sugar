class Api::CommentsController < ApplicationController

  def index

  end

  def create

    puts params 

      @comment = Comment.new(comment_params)
      
        if @comment.save
          render json: @comment, status: :created
        else
          render json: @ecomment.errors, status: :unprocessable_entity
        end
  end

    
  private 

  def comment_params
    params.permit(:users_id, :comment, :offers_request_id, :events_id, :notices_id)
  end


end
