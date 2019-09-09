class Api::AttendeesController < ApplicationController

  before_action :set_user, :set_event

  def index 
    # puts @event

    # @attendeesID = EventUser.where(events_id: @event)

    # render json: @attendeesID
  end


  def create
    @addAttendee = EventUser.new(attendee_params)
    @newAttendee = User.find_by(id: @user[:id])
    @newAttendee_with_events_id = @newAttendee.attributes.merge({"events_id" => @events_id})
    puts "*********"
    puts @newAttendee_with_events_id

    if @addAttendee.save
      render json: @newAttendee_with_events_id, status: :created
    else
      render json: @addAttendee.errors, 
      status: :unprocessable_entity
    end
  end


  def attendee_params 
    params.permit(:events_id, :users_id)
  end

  def set_user
    @user = User.find_by(id: params[:users_id])
  end

  def set_event
    @event = Event.find_by(id: params[:events_id])
    @events_id = params[:events_id]
  end

end
