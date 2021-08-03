Rails.application.routes.draw do
  
  resources :comments, only: [:index, :show, :create]
  resources :interested_games, only: [:index, :show, :create]
  resources :games, only: [:index, :show]
  resources :gamers, only: [:index, :show, :create]
  # resources :log_in, only: [:create]
  post "/log_in", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/getgames/:id", to: "gamers#get_games"
  get "/me", to: "sessions#show"
  get "/search", to: "gamers#request"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
