class Api::OffersRequestsController < ApplicationController

  def index

  @offers = OffersRequest.all.where(offer: true)
  @requests = OffersRequest.all.where(offer: false)

  # @useroffersrequests = User.find_by_sql("SELECT * FROM users RIGHT JOIN offers_requests ON users_id = users.id ORDER BY offers_requests.created_at DESC")

  render json: @offers

  end

end
