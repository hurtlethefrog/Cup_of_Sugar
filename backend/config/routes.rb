Rails.application.routes.draw do
  
  namespace :api do
    resources :articles, only: [:index]
    resources :events
    resources :notices, except: [:destroy]
    resources :offers
    resources :requests
    resources :households 

    resources :users do 
      resources :articles
    end

  end
  
end
