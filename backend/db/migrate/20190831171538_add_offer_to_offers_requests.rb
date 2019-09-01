class AddOfferToOffersRequests < ActiveRecord::Migration[6.0]
  def change
    add_column :offers_requests, :offer, :boolean
  end
end
