class Api::OffersRequestsController < ApplicationController

  def index

  @offers = OffersRequest.all.where(offer: true)
  @requests = OffersRequest.all.where(offer: false)

  @offers = OffersRequest.find_by_sql("SELECT offers_requests.*, users.id as user_id,first_name, last_name, profile_pic FROM offers_requests JOIN users ON offers_requests.owner_id = users.id WHERE offer = true AND deleted IS NOT true ORDER BY offers_requests.created_at DESC")

  @requests = OffersRequest.find_by_sql("SELECT offers_requests.*, users.id as user_id,first_name, last_name, profile_pic FROM offers_requests JOIN users ON offers_requests.owner_id = users.id WHERE offer IS NOT true AND deleted IS NOT true ORDER BY offers_requests.created_at DESC")

  @offerRequestComments = OffersRequest.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id IS NOT NULL ORDER BY comments.created_at DESC")

  render json: @offerRequestComments

  end

end
