Rails.application.routes.draw do
  
  post 'user_token' => 'user_token#create'
  namespace :api do
    resources :articles, only: [:index]
    resources :events do 
      resources :comments, except: [:update, :destroy]
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
    end

  end
  
end
