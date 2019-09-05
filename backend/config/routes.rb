Rails.application.routes.draw do
  
  post 'user_token' => 'user_token#create'
  namespace :api do
    resources :articles, only: [:index]
    resources :events
    resources :notices, except: [:destroy]
    resources :offers
    resources :requests
    resources :households

    resources :registrations

    resources :users do 
      resources :articles
    end

  end
  
end
