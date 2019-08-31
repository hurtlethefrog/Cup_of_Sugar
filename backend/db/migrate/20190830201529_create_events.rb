class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.references :users, index: true, foreign_key: {name: "owner_id"}
      t.string :title
      t.text :description
      t.datetime :start
      t.datetime :end
      t.string :location
      t.string :image
      t.boolean :cancelled
      t.boolean :archived

      t.timestamps
    end
  end
end
