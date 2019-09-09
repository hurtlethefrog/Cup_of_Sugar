class Api::HouseholdsController < ApplicationController
  before_action :set_user

  def index
    @households = Household.all

    render json: @households
  end

  def show
   render json: set_user_household(@user)
  end


  private 
    
    def set_user_household(@user.id)
      @household_by_id = User.select(:households_id).where(id: @user.id)
      @id = @household_by_id[0][:households_id]
      @household_members = User.where(households_id: @id)

      return @household_members
    end

    def set_user
      @user = User.find_by(id: params[:id]) 
    end

end
