class Api::UsersController < ApplicationController
  before_action :set_user

  def index
    @users = User.all 
    render json: @users
  end

  def create
    puts user_params
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # get user/id
  def show
    @events = Event.find_by_sql("SELECT events.*, users.id as user_id, first_name, last_name, profile_pic FROM events JOIN users ON events.owner_id = users.id WHERE owner_id = #{@user.id} ORDER BY events.created_at DESC")
  
    @eventsWithCommentsAndAttendees = @events.map {|event|
      modified_event = generate_hash_with_type(event, "event")
      comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id = #{event.id}")}
      attendees_hash = {:attendees => EventUser.find_by_sql("SELECT users.id as user_id, first_name, last_name, profile_pic FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE events_id = #{event.id}")}
  
      event_output = modified_event.merge(comments_hash).merge(attendees_hash)
  
      event_output
    } 

    @notices = Notice.find_by_sql("SELECT notices.*, users.id as user_id, first_name, last_name, profile_pic FROM notices JOIN users ON notices.user_id = users.id WHERE user_id = #{@user.id} ORDER BY notices.created_at DESC")

    @noticesWithComments = @notices.map {|notice|
      modified_notice = generate_hash_with_type(notice, "notice")
      comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notice_id = #{notice.id}")}
      notice_output = modified_notice.merge(comments_hash)

      notice_output
   }
 
    @requests = OffersRequest.find_by_sql("SELECT offers_requests.*, users.id as user_id,first_name, last_name,profile_pic FROM offers_requests JOIN users ON offers_requests.owner_id = users.id WHERE offer IS NOT true AND deleted IS NOT true AND owner_id = #{@user.id} ORDER BY offers_requests.created_at DESC")
    
    @requestsWithComments = @requests.map {|request|
      modified_request = generate_hash_with_type(request, "request")
      comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{request.id} ORDER BY comments.created_at DESC")}
      request_output = modified_request.merge(comments_hash)
  
      request_output
      }

    @offers = OffersRequest.find_by_sql("SELECT offers_requests.*, users.id as user_id,first_name, last_name, profile_pic FROM offers_requests JOIN users ON offers_requests.owner_id = users.id WHERE offer = true AND deleted IS NOT true AND owner_id = #{@user.id} ORDER BY offers_requests.created_at DESC")

    @offersWithComments = @offers.map {|offer|
      modified_offer = generate_hash_with_type(offer, "offer")
      comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{offer.id} ORDER BY comments.created_at DESC")}
      offer_output = modified_offer.merge(comments_hash)

      offer_output
    }

    @userArticles = @eventsWithCommentsAndAttendees + @noticesWithComments + @requestsWithComments + @offersWithComments
    
    render json: @userArticles

  end

  def generate_hash_with_type(object, type)
    hash = object.attributes
    type_property = {:type => type}
    hash_with_type = hash.merge(type_property)

    return hash_with_type
  end

  private 

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:userForm).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
