Rails.application.routes.draw do
  
  namespace :api do
    resources :articles, only: [:index]
    resources :users
    resources :events
    resources :notices, except: [:destroy]
    resources :offers_requests
    resources :households 
  end
  
end
