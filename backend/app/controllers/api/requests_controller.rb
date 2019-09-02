class Api::RequestsController < ApplicationController

  def index

    @requests = OffersRequest.all.where(offer: false)
  
    @requests = OffersRequest.find_by_sql("SELECT offers_requests.*, users.id as user_id,first_name, last_name, profile_pic FROM offers_requests JOIN users ON offers_requests.owner_id = users.id WHERE offer IS NOT true AND deleted IS NOT true ORDER BY offers_requests.created_at DESC")
  
    @requestsWithComments = @requests.map {|request|
    modified_request = generate_hash_with_type(request, "request")
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{request.id} ORDER BY comments.created_at DESC")}
    request_output = modified_request.merge(comments_hash)
  
    request_output
  }
  
    render json: @requestsWithComments
  
    end

    def generate_hash_with_type(object, type)
      hash = object.attributes
      type_property = {:type => type}
      hash_with_type = hash.merge(type_property)
  
      return hash_with_type
    end

end
