class Invite < ApplicationRecord

    has_one :users, optional: false
    belongs_to :events, optional: false

    alias invite_id id 
  
  end
  