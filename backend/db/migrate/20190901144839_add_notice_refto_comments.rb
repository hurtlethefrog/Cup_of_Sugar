class AddNoticeReftoComments < ActiveRecord::Migration[6.0]
  def change
    add_reference :comments, :notice, index: true
  end
end
