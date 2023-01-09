Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'welcome#index'
  resources :instruments, only: [:show, :index, :create]
  resources :genres, only: [:show, :index, :post]
  resources :locations, only: [:show, :index, :post]
  resources :users
  post '/signup', to: 'users#create'
  get '/me', to: 'users#show'
  get '/lookup/:user_id', to: 'users#lookup'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
