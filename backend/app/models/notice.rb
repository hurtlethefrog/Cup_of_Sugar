class Notice < ApplicationRecord

  belongs_to :user, optional: true
  has_many :comments
  has_many :flaggeds

end
