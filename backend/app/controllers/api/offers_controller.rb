class Api::OffersController < ApplicationController

  before_action :set_offer

  def index

  @offers = OffersRequest.where(offer: true)

  @offersWithComments = @offers.map {|offer|
  modified_offer = offer.attributes
  user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{offer.owner_id}")}
  comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{offer.id} ORDER BY comments.created_at DESC")}
  offer_output = modified_offer.merge(user_hash).merge(comments_hash)

  offer_output
}

  render json: @offersWithComments

  end

  #GET offers/id
  def show
    render json: @offer
  end

    #POST
    def create

      @offer = OffersRequest.new(offer_params)
      if @offer.save
        render json: @offer, status: :created
      else
        render json: @offer.errors, status: :unprocessable_entity
      end
  
    end

  private 

  def set_offer
    @offer = OffersRequest.find_by(id: params[:id])
  end

  def offer_params 
    params.permit(:title, :description, :image, :offer)
  end


end
