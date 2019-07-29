Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: 'json'} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:index]
    get '/stocks/:symbol', to: 'stocks#show'
    resources :portfolios, only: [:show, :update]
    resources :transactions, only: [:index, :create]
    resources :searches, only: [:show]
    resources :watchlists, only: [:destroy, :update]
    get '/watchlists/:user_id', to: 'watchlists#show'
  end
end
