class Api::CommentsController < ApplicationController
  before_action :set_user, only: [:create]

  def index

  end

  def create

    @comment = Comment.new(comment_params)
      if @comment.save
        @comment_to_render = @comment.attributes.merge({"first_name" => @user["first_name"], "last_name" => @user["last_name"], "profile_pic" => @user["profile_pic"]})
        puts "*************"
        p @comment_to_render
        render json: @comment_to_render, status: :created
      else
        render json: @ecomment.errors, status: :unprocessable_entity
      end
  end

  private 

  def comment_params
    params.permit(:users_id, :comment, :offers_requests_id, :events_id, :notices_id)
  end

  def set_user
    @user = User.select('id AS user_id', :first_name, :last_name, :profile_pic).find_by(id: params[:users_id])
    # @user_pic = User.find_by_sql("SELECT profile_pic FROM users WHERE id = #{@user["id"]}")[0][:profile_pic]
  end


end
