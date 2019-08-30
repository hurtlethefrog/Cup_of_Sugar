class CreateEventUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :event_users do |t|
      t.references :events, index: true, foreign_key: true
      t.references :users, index: true, foreign_key: true

      t.timestamps
    end
  end
end
