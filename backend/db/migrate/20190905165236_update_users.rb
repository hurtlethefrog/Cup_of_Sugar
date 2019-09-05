class UpdateUsers < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :password_confirmation
    rename_column :users, :password, :password_digest
  end
end