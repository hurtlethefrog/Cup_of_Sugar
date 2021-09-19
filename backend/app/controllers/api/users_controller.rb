class Api::UsersController < ApplicationController
  before_action :set_user
  # before_action :postal_code, :set_community, only: [:create]
  # before_action :postal_code, only: [:create]

  def index
    @users = User.all 
    render json: @users
  end

  def create
    @user = User.new(user_params)
    @household = Household.create(address_params)
    @household.update(communities_id: 1)
    # @household.update(communities_id: @community_id)
    @user.update(households_id: @household[:id])
    if @user.save
      @user_id = @user[:id]
      @user_with_id = @user.attributes.merge({:user_id => @user_id})
      render json: @user_with_id, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show 
    # couldn't get named route to work, using show temporarily
    @users = User.find_by_sql("
    SELECT users.id, first_name, last_name 
    FROM users 
    LEFT JOIN households ON users.households_id = households.id
    LEFT JOIN communities ON communities.id = households.communities_id
    WHERE communities.id = (
      SELECT communities.id 
      FROM communities
      LEFT JOIN households ON communities.id = households.communities_id
      LEFT JOIN users ON users.households_id = households.id
      WHERE users.id = " << params[:id] << "
    );")
    render json: @users
  end
    
  private 

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def address_params
    params.require(:userForm).permit(:address, :postal_code, :city, :province)
  end

  # def postal_code
  #   @postal_code = params.require(:userForm).permit(:postal_code).to_hash
  #   @postal_code_3_digits = @postal_code["postal_code"][0,3]
  # end

end
