class Notices < ActiveRecord::Migration[6.0]
  def change
    create_table :notices do |t|
      t.references :users, index: true, foreign_key: {name: "owner_id"}
      t.string :title
      t.string :description
      t.boolean :archived

      t.timestamps
    end
  end
end
