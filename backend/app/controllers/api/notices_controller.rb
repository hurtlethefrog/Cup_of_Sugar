class Api::NoticesController < ApplicationController

  def index

  @notices = Notice.order(created_at: :desc)

  render json: @notices

  end

end


