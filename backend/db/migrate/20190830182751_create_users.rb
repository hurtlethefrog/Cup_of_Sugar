class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :password
      t.string :password_confirmation
      t.string :profile_pic
      t.string :phone_number
      t.string :bio
      t.string :private

      t.timestamps
    end
  end
end
