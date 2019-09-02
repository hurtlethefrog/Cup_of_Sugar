class Api::OffersController < ApplicationController

  before_action :set_offer

  def index

  @offers = OffersRequest.all.where(offer: true)

  @offers = OffersRequest.find_by_sql("SELECT offers_requests.*, users.id as user_id,first_name, last_name, profile_pic FROM offers_requests JOIN users ON offers_requests.owner_id = users.id WHERE offer = true AND deleted IS NOT true ORDER BY offers_requests.created_at DESC")

  @offersWithComments = @offers.map {|offer|
  modified_offer = generate_hash_with_type(offer, "offer")
  comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{offer.id} ORDER BY comments.created_at DESC")}
  offer_output = modified_offer.merge(comments_hash)

  offer_output
}

  render json: @offersWithComments

  end

  def generate_hash_with_type(object, type)
    hash = object.attributes
    type_property = {:type => type}
    hash_with_type = hash.merge(type_property)

    return hash_with_type
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
