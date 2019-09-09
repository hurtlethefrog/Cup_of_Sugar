class Api::UsersController < ApplicationController
  before_action :set_user
  # before_action :user_params_hash, only: [:create]
  # before_action :set_community, only: [:create]

  def index
    @users = User.all 
    render json: @users
  end

  def create
    puts "**************"
    puts @user_hash
    puts "commmmmmmmunity"
    puts @community
    puts "**************"
    @user = User.new(user_params)
    @household = Household.create(address_params)
    @household.update(communities_id: 1)
    @user.update(households_id: @household[:id])
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: @user
  end
    
  private 

  def set_user
    @user = User.find_by(id: params[:id])
  end

  # def set_community
  #   @first_3_postal_code = @user_hash["postal_code"][0,3]
  #   @community = Community.where("postal_code LIKE (?)", "%#{@first_3_postal_code}%")
  #   # @community = {:id => Community.find_by_sql("SELECT id FROM communities WHERE postal_code = 'H2T'")}
  # end

  def user_params
    params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def address_params
    params.require(:userForm).permit(:address, :postal_code, :city, :province)
  end

  # def user_params_hash
  #   @user_hash = params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation, :address, :postal_code, :city, :province).to_hash
  # end

end
