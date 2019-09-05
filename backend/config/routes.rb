Rails.application.routes.draw do
  
  namespace :api do
    resources :articles, only: [:index]
    resources :events
    resources :notices, except: [:destroy]
    resources :offers
    resources :requests
    resources :households
    
    resources :registrations

    resources :user_token do
      post 'user_token' => 'user_token#create'
    end

    resources :users do 
      resources :articles
    end

  end
  
end
