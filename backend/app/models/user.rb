class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true

  belongs_to :household, optional: true

  has_and_belongs_to_many :events

  has_many :notices
  has_many :offers_requests
  has_many :comments
  has_many :flaggeds

  def to_token_payload
    {
      sub: id,
      email: email
    }
  end

end
