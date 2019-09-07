class Event < ApplicationRecord

  has_and_belongs_to_many :users
  alias events_id id 

end
