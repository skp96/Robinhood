Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: {format: 'json'} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :stocks, only: [:create, :index]
    get '/stocks/:symbol', to: 'stocks#show'
    resources :portfolios, only: [:show]
    resources :transactions, only: [:index, :create]
    resources :portfolio_joins, only: [:create]
    get '/portfolio_joins/:portfolios_id', to: 'portfolio_joins#update'
    get '/portfolio_joins/:portfolios_id', to: 'portfolio_joins#destroy'
  end
end
