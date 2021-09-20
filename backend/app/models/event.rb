class Event < ApplicationRecord

  has_and_belongs_to_many :users
  has_many :invites
  alias events_id id 

  # has_one_attached :image
end
