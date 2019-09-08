class Api::UsersController < ApplicationController
  before_action :set_user

  def index
    puts params
    
    @users = User.all 
    render json: @users
  end

  def create
    puts user_params
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @user
  end

  # def current_user_info
  #   render status: :ok, json: current_user.as_json
  # end

  # get user/id
  # def show
    
  private 

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
