class Api::EventsController < ApplicationController

  def index

  @events = Event.order(created_at: :desc)

  # @event = User.find_by_sql("SELECT events.*, comments.*, users.id, first_name, last_name, profile_pic FROM users JOIN events ON users_id = users.id FULL OUTER JOIN comments ON events.id = events_id ORDER BY events.created_at DESC")

  render json: @events

  end

end
