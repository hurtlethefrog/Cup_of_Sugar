class CreateHouseholds < ActiveRecord::Migration[6.0]
  def change
    create_table :households do |t|
      t.references :communities, index: true, foreign_key: true
      t.string :address
      t.string :postal_code
      t.string :province
      t.string :city

      t.timestamps
    end
  end
end
