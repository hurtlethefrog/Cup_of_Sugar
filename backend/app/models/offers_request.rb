class OffersRequest < ApplicationRecord
  
  belongs_to :user, optional: true
  has_many :comments
  has_many :flaggeds

  alias offers_requests_id id

end
