Rails.application.routes.draw do
  
  resources :comments, only: [:index, :show, :create]
  resources :interested_games, only: [:index, :show, :create, :destroy]
  resources :games, only: [:index, :show, :create, :update]
  resources :gamers, only: [:index, :show, :create]
  # resources :log_in, only: [:create]
  post "/log_in", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/getgames/:id", to: "gamers#get_games"
  get "/getinterests/:id", to: "gamers#get_interests"
  get "/me", to: "sessions#show"
  get "/search", to: "api_connections#fetcher"
  patch "/updatetimeplayed/:id", to: "games#update_time_played"
  get "gamecomments/:id", to: "games#get_comments"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  
end
