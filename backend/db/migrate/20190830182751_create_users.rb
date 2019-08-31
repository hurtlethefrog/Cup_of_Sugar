class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.references :households, index: true, foreign_key: true
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :password
      t.string :password_confirmation
      t.string :profile_pic
      t.string :phone_number
      t.string :bio
      t.string :private
      t.boolean :is_admin

      t.timestamps
    end
  end
end
