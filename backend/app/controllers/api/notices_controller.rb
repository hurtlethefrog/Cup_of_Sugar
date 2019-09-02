class Api::NoticesController < ApplicationController

  before_action :set_notice

  def index

  @notices = Notice.find_by_sql("SELECT notices.*, users.id as user_id, first_name, last_name, profile_pic FROM notices JOIN users ON notices.user_id = users.id ORDER BY notices.created_at DESC")

  @noticeComments = Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notice_id IS NOT NULL ORDER BY comments.created_at DESC")

  @noticesWithComments = @notices.map {|notice|
    modified_notice = generate_hash_with_type(notice, "notice")
    comments_hash = {:comments => Comment.find_by_sql("SELECT comments.*, users.id as user_id, first_name, last_name, profile_pic FROM comments JOIN users on comments.users_id = users.id WHERE notice_id = #{notice.id}")}
    notice_output = modified_notice.merge(comments_hash)

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
    params.require(:notice).permit(:title, :description)
  end


end
