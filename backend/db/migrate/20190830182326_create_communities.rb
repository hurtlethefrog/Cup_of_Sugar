class CreateCommunities < ActiveRecord::Migration[6.0]
  def change

    create_table :communities do |t|
      t.string :name
      t.string :postal_code
      
      t.timestamps
    end
  end
end
