class Api::EventsController < ApplicationController

  before_action :set_event
  #  :authenticate_user

  def index

  @events = Event.order(created_at: :desc)

  @eventsWithCommentsAndAttendees = @events.map {|event|
    modified_event = event.attributes
    events_id = {:events_id => event.id}
    user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{event.owner_id}")}
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE comments.events_id = #{event.id}")}
    attendees_hash = {:attendees => EventUser.find_by_sql("SELECT users.id as user_id, first_name, last_name, profile_pic FROM event_users JOIN users ON event_users.users_id = users.id JOIN events ON event_users.events_id = events.id WHERE event_users.events_id = #{event.id}")}

    event_output = modified_event.merge(events_id).merge(user_hash).merge(comments_hash).merge(attendees_hash)

    event_output
  } 

  render json:
# @eventsWithCommentsAndAttendees.with_attached_image
@eventsWithCommentsAndAttendees

  end

  #GET events/id
  def show
    render json: @event
  end

      #POST
  def create

    @new_event = Event.new(event_params)

      if @new_event.save
        Rails.cache.write('event', @new_event.id)
        create_invites
        # render json: @new_event, status: :created
      else
        render json: @new_event.errors, status: :unprocessable_entity
      end
    
  end
  
  private 
  
    def set_event
      @event = Event.find_by(id: params[:id])
    end

    def create_invites
      # render json: params and return
      params[:invitees].split(',').each do |uid| 
        # render json: Rails.cache.read("event") and return
        # @user = User.find_by(id: uid)
        # @event = Event.find_by(id: Rails.cache.read("event"))
        @inv = Invite.create(user_id: uid, event_id: Rails.cache.read("event"), aknowledged: false)
        # ActiveRecord::Base.connection.execute(
        #   "
        #   INSERT INTO invites 
        #     (aknowledged, user_id, event_id, created_at) 
        #   VALUES 
        #     (false, "<<@event.id.to_s<<", "<<uid<<", "<<Time.now.to_s<< " );
        #   "
        # )
        if @inv.errors
          render json: @inv.errors, status: :unprocessable_entity and return
        end
      end
    end
  
    # def set_user
    #   @user = User.find_by(id: params[:owner_id])
    # end

    def event_params 
      params.permit(:title, :description, :owner_id, :start, :end, :location, :image, :invitees)
    end

end

