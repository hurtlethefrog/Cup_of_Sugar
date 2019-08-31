class CreateNotices < ActiveRecord::Migration[6.0]
  def change
    create_table :notices do |t|
      t.string :title
      t.text :description
      t.boolean :archived
      t.references :users, index: true, foreign_key: true

      t.timestamps
    end
  end
end
