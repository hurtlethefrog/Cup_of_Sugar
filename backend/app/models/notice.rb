class Notice < ApplicationRecord

  belongs_to :user, optional: true
  has_many :comments
  has_many :flaggeds

  alias notices_id id 

end
