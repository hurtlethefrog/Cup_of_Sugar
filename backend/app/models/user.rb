class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true
  validates_uniqueness_of :email, :case_sensitive => false

  belongs_to :household, optional: true

  has_and_belongs_to_many :events

  has_many :notices
  has_many :invites
  has_many :offers_requests
  has_many :comments
  has_many :flaggeds

  alias owner_id id 

  def to_token_payload
    {
      sub: id,
      user_id:id,
      email: email
    }
  end

end
