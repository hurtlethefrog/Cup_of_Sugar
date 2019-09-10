class Api::RequestsController < ApplicationController

  before_action :set_request

  def index

    @requests = OffersRequest.all.where(offer: false).order(created_at: :desc)
  
    @requestsWithComments = @requests.map {|request|
    modified_request = request.attributes
    offers_requests_id ={:offers_requests_id => request.id}
    user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{request.owner_id}")}
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{request.id} ORDER BY comments.created_at DESC")}
    request_output = modified_request.merge(offers_requests_id).merge(user_hash).merge(comments_hash)
  
    request_output
  }
  
    render json: @requestsWithComments
  
    end

    #GET requests/id
    def show
      render json: @request.as_json(methods: [:offers_requests_id])
    end

    #POST
    def create

      @request = OffersRequest.new(request_params)
      @request.update(offer: false)
        if @request.save
          puts "***************"
          p @request
          render json: @request, status: :created
        else
          render json: @request.errors, status: :unprocessable_entity
        end
      
      end
    
    private 
    
      def set_request
        @request = OffersRequest.find_by(id: params[:id])
      end
    
      def request_params 
        params.permit(:title, :description, :image, :offer, :owner_id, :article_type)
      end

end
