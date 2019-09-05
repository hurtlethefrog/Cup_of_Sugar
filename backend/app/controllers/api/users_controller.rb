class Api::UsersController < ApplicationController
  before_action :set_user

  def index
    @users = User.all 
    render json: @users
  end

  def create
  end

  # get user/id
  def show
    
        @user_articles = Event.find_by_sql("SELECT events.id as event_id, -1 AS notice_id, -1 AS offer_request_id, owner_id, article_type, title, description, location, image, false AS offer, events.start, events.end, cancelled, archived, created_at, updated_at FROM events WHERE owner_id = #{@user.id} AND archived IS NOT TRUE UNION ALL SELECT -1 AS events_id, notices.id AS notice_id, -1 AS offer_request_id, user_id AS owner_id, article_type, title, description, null AS location, null AS image, false AS offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM notices WHERE user_id = #{@user.id} AND archived IS NOT true UNION ALL SELECT -1 AS event_id, -1 AS notice_id, offers_requests.id AS offer_request_id, owner_id, article_type, title, description, null AS location, image, offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM offers_requests WHERE owner_id = #{@user.id} AND archived IS NOT true AND active IS TRUE AND deleted IS NOT true ORDER BY created_at DESC")    
          
        @WithCommentsAndAttendees = @user_articles.map {|article|
          modified_articles = generate_id(article)
          owner_hash = {:owner => User.find_by_sql("SELECT id, first_name, last_name, profile_pic FROM users WHERE #{article.owner_id} = users.id")}
          comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*,first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id = #{article.event_id} OR notice_id = #{article.notice_id} OR offers_requests_id = #{article.offer_request_id} ORDER BY created_at")}
          attendees_hash = {:attendees => EventUser.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE events_id = #{article.event_id}")}
        
          output = modified_articles.merge(owner_hash).merge(comments_hash).merge(attendees_hash)
        
          output
        } 
          
        render json: @WithCommentsAndAttendees
        
        end
        
          def generate_id(object)
            hash = object.attributes
        
            if object.event_id > 0
              id = 10 * object.event_id
            elsif object.notice_id > 0
              id = 50000 * object.notice_id
            elsif object.offer_request_id > 0 && object.offer = true
              id = object.offer_request_id * 100
            elsif object.offer_request_id >0 && object.offer = !true
            end 
        
            id_property = {:id => id.to_i}
            hash_with_id = hash.merge(id_property)
        
            return hash_with_id
          end
    
  private 

  def set_user
    @user = User.find_by(id: params[:id])
  end

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
