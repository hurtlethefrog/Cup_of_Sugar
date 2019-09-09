class ChangeNoticeUserName < ActiveRecord::Migration[6.0]
  def change
    rename_column :notices, :user_id, :owner_id
  end
end
