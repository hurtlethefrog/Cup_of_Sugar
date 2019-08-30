class CreateOffersRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :offers_requests do |t|
      t.references :users, index: true, foreign_key: {name:"owner_id"}
      t.string :title
      t.text :description
      t.string :image
      t.boolean :active
      t.boolean :deleted
      t.boolean :archived

      t.timestamps
    end
  end
end
