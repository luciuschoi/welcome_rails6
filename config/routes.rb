Rails.application.routes.draw do
  root to: 'home#index'
  resources :posts
  resources :uploads, only: [:create, :destroy]
end
