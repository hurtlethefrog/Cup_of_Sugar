class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.references :users, index: true, foreign_key: true
      t.text :text
      t.references :notices, index: true, foreign_key: true
      t.references :offers_requests, index: true, foreign_key: true
      t.references :events, index: true, foreign_key: true

      t.timestamps
    end
  end
end
