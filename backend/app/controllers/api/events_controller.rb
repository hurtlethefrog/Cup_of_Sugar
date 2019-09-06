class Api::EventsController < ApplicationController

  before_action :set_event, :set_user

  def index

  @events = Event.order(created_at: :desc)

  @eventsWithCommentsAndAttendees = @events.map {|event|
    modified_event = event.attributes
    user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{event.owner_id}")}
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE events_id = #{event.id}")}
    attendees_hash = {:attendees => EventUser.find_by_sql("SELECT users.id as user_id, first_name, last_name, profile_pic FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE events_id = #{event.id}")}

    event_output = modified_event.merge(user_hash).merge(comments_hash).merge(attendees_hash)

    event_output
  } 

  render json: @eventsWithCommentsAndAttendees

  end

  #GET events/id
  def show
    render json: @event
  end

      #POST
  def create
    @event = Event.new(event_params)
    
      if @event.save
        render json: @event, status: :created
      else
        render json: @event.errors, status: :unprocessable_entity
      end
    
  end
  
  private 
  
    def set_event
      @event = Event.find_by(id: params[:id])
    end
  
    def set_user
      @user = User.find_by(id: params[:owner_id])
    end

    def event_params 
      params.permit(:title, :description, :owner_id, :start, :end, :location, :image)
    end

end

