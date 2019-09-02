class ChangeOwnerForeignKeyName < ActiveRecord::Migration[6.0]
  def change

    rename_column :events, :users_id, :owner_id
    add_reference :notices, :user, index: true, foreign_key: true
    rename_column :offers_requests , :users_id, :owner_id
    rename_column :comments, :text, :comment

  end
end
