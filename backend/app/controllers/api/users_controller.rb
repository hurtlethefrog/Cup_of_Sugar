class Api::UsersController < ApplicationController
  def index
    @users = User.all 
    render json: @users
  end

  def show
  end

  def create
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end