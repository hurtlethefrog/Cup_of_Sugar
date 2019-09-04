class Api::NoticesController < ApplicationController

  before_action :set_notice

  def index

  @notices = Notice.all

  # @noticeComments = Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notice_id IS NOT NULL ORDER BY comments.created_at DESC")

  @noticesWithComments = @notices.map {|notice|
    modified_notice = generate_hash_with_type(notice, "notice")
    user_hash = {:owner => User.find_by_sql("SELECT users.id, first_name, last_name, profile_pic FROM users WHERE users.id = #{notice.user_id}")}
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notice_id = #{notice.id}")}
    notice_output = modified_notice.merge(user_hash).merge(comments_hash)

    notice_output
  }
    
    render json: @noticesWithComments

  end

  def generate_hash_with_type(object, type)
    hash = object.attributes
    type_property = {:type => type}
    hash_with_type = hash.merge(type_property)

    return hash_with_type
  end

  #GET notices/id
  def show
    render json: @notice
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

  def notice_params 
    params.permit(:title, :description)
  end


end
