class Api::UsersController < ApplicationController
  before_action :set_user
  before_action :user_params_hash, :set_community, only: [:create]

  def index
    @users = User.all 
    render json: @users
  end

  def create
    puts "**************"
    # puts @community
    puts "**************"
    @user = User.new(user_params)
    @household = Household.create()
    @household.update(address: @user_hash["first_name"])
    # @household.update(address: @user_hash["address"], postal_code: @user_hash["postal_code"], city: @user_hash["city"], province: @user_hash["province"], communities_id: @community[:id])
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

  def set_community
    # # @first_3_postal_code = "H2"
    # # @community = Community.where("postal_code LIKE (?)", "%#{@first_3_postal_code}%")
    # @community = {:id => Community.find_by_sql("SELECT * FROM communities WHERE postal_code = 'H2T'")}
  end

  # def user_params
  #   params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation, :address, :postal_code, :city, :province)
  # end

  def user_params
    params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def user_params_hash
    @user_hash = params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation, :address, :postal_code, :city, :province).to_hash
  end

end
