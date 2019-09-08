class UpdateCommentsAndHouseholdDefault < ActiveRecord::Migration[6.0]
  def change
    rename_column :comments, :notice_id, :notices_id
    change_column_default :households, :communities_id, nil
  end
end
