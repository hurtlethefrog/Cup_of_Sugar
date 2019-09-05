class AddTypeColumnToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :notices, :article_type, :string, default: 'notice'
    add_column :events, :article_type, :string, default: 'event'
    add_column :offers_requests, :article_type, :string
    add_column :users, :preferred_contact, :string
  end
end
