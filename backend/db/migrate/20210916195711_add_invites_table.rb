class AddInvitesTable < ActiveRecord::Migration[6.0]
  # invite_id | invited_user_id | created_at | status | event_id
  def change
    create_join_table :users, :events, table_name: :invites do |t|
      # t.bigint :invite_id
      t.boolean :aknowledged
      t.datetime :created_at, null: false
    end
  end
end
