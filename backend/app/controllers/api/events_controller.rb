class Api::EventsController < ApplicationController

  def index

  @events = Event.order(created_at: :desc)


  @events = Event.find_by_sql("SELECT events.*, users.id as user_id, first_name, last_name, profile_pic FROM events JOIN users ON events.owner_id = users.id ORDER BY events.created_at DESC")

  @eventComments = Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id IS NOT NULL ORDER BY comments.created_at DESC")

  @eventAttendees = EventUser.find_by_sql("SELECT users.id as user_id, first_name, last_name, profile_pic, events.* FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id")

  @eventsWithCommentsAndAttendees = @events.map {|event|

  [event, Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id = #{event.id}"), EventUser.find_by_sql("SELECT users.id as user_id, first_name, last_name, profile_pic, events.* FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE events_id = #{event.id}")
  ]} 

  render json: @eventsWithCommentsAndAttendees

  end

end

