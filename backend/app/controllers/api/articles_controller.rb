class Api::ArticlesController < ApplicationController
  before_action :set_user
    
  def index

    puts params
    puts @user

    # api/users/:id/articles
    if @user

      @articles = Event.find_by_sql("SELECT id, events.id as events_id, -1 AS notices_id, -1 AS offers_requests_id, owner_id, article_type, title, description, location, image, false AS offer, events.start, events.end, cancelled, archived, created_at, updated_at FROM events WHERE owner_id = #{@user.id} AND archived IS NOT TRUE UNION ALL SELECT id, -1 AS events_id, notices.id AS notices_id, -1 AS offers_requests_id, owner_id, article_type, title, description, null AS location, null AS image, false AS offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM notices WHERE owner_id = #{@user.id} AND archived IS NOT true UNION ALL SELECT id, -1 AS events_id, -1 AS notices_id, offers_requests.id AS offers_requests_id, owner_id, article_type, title, description, null AS location, image, offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM offers_requests WHERE owner_id = #{@user.id} AND archived IS NOT true AND active IS TRUE AND deleted IS NOT true ORDER BY created_at DESC")
    
    # api/articles
    else 
      @articles = Event.find_by_sql("SELECT id, events.id as events_id, -1 AS notices_id, -1 AS offers_requests_id, owner_id, article_type, title, description, location, image, false AS offer, events.start, events.end, cancelled, archived, created_at, updated_at FROM events WHERE archived IS NOT TRUE UNION ALL SELECT id, -1 AS events_id, notices.id AS notices_id, -1 AS offers_requests_id, owner_id, article_type, title, description, null AS location, null AS image, false AS offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM notices WHERE archived IS NOT true UNION ALL SELECT id, -1 AS events_id, -1 AS notices_id, offers_requests.id AS offers_requests_id, owner_id, article_type, title, description, null AS location, image, offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM offers_requests WHERE archived IS NOT true AND active IS TRUE AND deleted IS NOT true ORDER BY created_at DESC")
    end
      
    @WithCommentsAndAttendees = @articles.map {|article|
      modified_articles = generate_id(article)
      owner_hash = {:owner => User.find_by_sql("SELECT id, first_name, last_name, profile_pic FROM users WHERE #{article.owner_id} = users.id")}
      comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*,first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id = #{article.events_id} OR notices_id = #{article.notices_id} OR offers_requests_id = #{article.offers_requests_id} ORDER BY created_at")}
      attendees_hash = {:attendees => EventUser.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE events_id = #{article.events_id}")}
    
      output = modified_articles.merge(owner_hash).merge(comments_hash).merge(attendees_hash)
    
      output
    } 
      
    render json: @WithCommentsAndAttendees
    
    end
    
      def generate_id(object)
        hash = object.attributes
    
        if object.article_type == 'event' 
          id = 10 * object.id
        elsif object.article_type == 'notice'
          id = 50000 * object.id
        elsif object.article_type == 'offer' 
          id = 100 * object.id
        elsif object.article_type == 'request'
          id = object.id
        end 
    
        id_property = {:id => id.to_i}
        hash_with_id = hash.merge(id_property)
    
        return hash_with_id
      end

    private 
      def set_user
        @user = User.find_by(id: params[:user_id])
      end

  end

