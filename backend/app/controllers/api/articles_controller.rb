class Api::ArticlesController < ApplicationController
    
  def index

    @articles = Event.find_by_sql("SELECT events.id as event_id, -1 AS notice_id, -1 AS offer_request_id, owner_id, article_type, title, description, location, image, false AS offer, events.start, events.end, cancelled, archived, created_at, updated_at FROM events WHERE archived IS NOT TRUE UNION ALL SELECT -1 AS events_id, notices.id AS notice_id, -1 AS offer_request_id, user_id AS owner_id, article_type, title, description, null AS location, null AS image, false AS offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM notices WHERE archived IS NOT true UNION ALL SELECT -1 AS event_id, -1 AS notice_id, offers_requests.id AS offer_request_id, owner_id, article_type, title, description, null AS location, image, offer, null AS start, null AS end, null AS cancelled, archived, created_at, updated_at FROM offers_requests WHERE archived IS NOT true AND active IS TRUE AND deleted IS NOT true ORDER BY created_at DESC")    
      
    @WithCommentsAndAttendees = @articles.map {|article|
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

#   def generateID(article)
#   if article.event_id > 0
#     return article.id.to_i * 10.to_i
#   elsif article.notice_id > 0
#     return article.id.to_i * 20.to_i
#   elsif article.offer_request_id > 0 && article.offer = true
#     return article.id.to_i * 30.to_i
#   end
# end

  end

# def index
#   @events = Event.order(created_at: :desc)
  
#   @eventsWithCommentsAndAttendees = @events.map {|event|
#     modified_event = generate_hash_with_type(event, "event")
#     user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{event.owner_id}")}
#     comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id = #{event.id}")}
#     attendees_hash = {:attendees => EventUser.find_by_sql("SELECT users.id as user_id, first_name, last_name, profile_pic FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE events_id = #{event.id}")}

#     event_output = modified_event.merge(user_hash).merge(comments_hash).merge(attendees_hash)

#     event_output
#   } 

#   @notices = Notice.find_by_sql("SELECT notices.*, users.id as user_id, first_name, last_name, profile_pic FROM notices JOIN users ON notices.user_id = users.id ORDER BY notices.created_at DESC")

#   @noticesWithComments = @notices.map {|notice|
#     modified_notice = generate_hash_with_type(notice, "notice")
#     user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{notice.user_id}")}
#     comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notice_id = #{notice.id}")}
#     notice_output = modified_notice.merge(user_hash).merge(comments_hash)

#     notice_output
#  }

#  @requests = OffersRequest.where(offer: false)
    
#  @requestsWithComments = @requests.map {|request|
#    modified_request = generate_hash_with_type(request, "request")
#    user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{request.owner_id}")}
#    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{request.id} ORDER BY comments.created_at DESC")}
#    request_output = modified_request.merge(user_hash).merge(comments_hash)

#    request_output
#    }

#    @offers = OffersRequest.where(offer: true)

#    @offersWithComments = @offers.map {|offer|
#      modified_offer = generate_hash_with_type(offer, "offer")
#      user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{offer.owner_id}")}
#      comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE offers_requests_id = #{offer.id} ORDER BY comments.created_at DESC")}
#      offer_output = modified_offer.merge(user_hash).merge(comments_hash)

#      offer_output
#    }

#    @userArticles = @eventsWithCommentsAndAttendees + @noticesWithComments + @requestsWithComments + @offersWithComments
    
#    render json: @userArticles
# end

# def generate_hash_with_type(object, type)
#   hash = object.attributes
#   type_property = {:type => type}
#   hash_with_type = hash.merge(type_property)

#   return hash_with_type
# end

# end
