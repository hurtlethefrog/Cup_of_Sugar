Rails.application.routes.draw do
  
  namespace :api do
    resources :articles, only: [:index]

    resources :user_token do
      post 'user_token' => 'user_token#create'
    end
    resources :events do 
      resources :comments, except: [:update, :destroy]
      resources :attendees, except: [:update]
    end
    resources :notices, except: [:destroy] do
      resources :comments, except: [:update, :destroy]
    end
    resources :offers do
      resources :comments, except: [:update, :destroy]
    end
    resources :requests do
      resources :comments, except: [:update, :destroy]
    end

    resources :households 

    resources :users do 
      resources :articles

      get '/login' => 'sessions#new'
      post '/login' => 'sessions#create'
      get '/logout' => 'sessions#destroy'

      get '/registration' => 'users#new'
      post '/users' => 'users#create'
    end

  end
  
end
