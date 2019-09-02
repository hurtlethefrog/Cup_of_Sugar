class AddDefaultValues < ActiveRecord::Migration[6.0]
  def change
    change_column_default :events, :cancelled, false
    change_column_default :events, :archived, false

    change_column_default :notices, :archived, false

    change_column_default :offers_requests, :archived, false
    change_column_default :offers_requests, :active, true
    change_column_default :offers_requests, :deleted, false

    change_column_default :users, :private, false
    change_column_default :users, :is_admin, false
    
    change_column_default :households, :communities_id, '5000'

  end
end
