class Api::NoticesController < ApplicationController

  before_action :set_notice, :set_user

  def index

    puts params

  @notices = Notice.order(created_at: :desc)

  @noticesWithComments = @notices.map {|notice|
    modified_notice = notice.attributes
    notices_id = {:notices_id => notice.id}
    user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{notice.user_id}")}
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notices_id = #{notice.id}")}
    notice_output = modified_notice.merge(notices_id).merge(user_hash).merge(comments_hash)

    notice_output
  }
    
    render json: @noticesWithComments

  end

  #GET notices/id
  def show
    render json: @notice.as_json(methods:[:notices_id])
  end

  #POST
  def create

    @notice = Notice.new(notice_params)
    if @notice.save
      render json: @notice, status: :created
    else
      render json: @notice.errors, status: :unprocessable_entity
    end

  end

  def update
    if @notice.update(notice_params)
      render json: @notice
    else 
      render json: @notice.errors, status: :unprocessable_entity
    end
  end

  private 

  def set_notice
    @notice = Notice.find_by(id: params[:id])
  end

  def set_user
    @user = User.find_by(id: params[:user_id])
  end

  def notice_params 
    params.permit(:title, :description)
  end


end
