Omrails::Application.routes.draw do
  get "users/show"

  resources :projects

  devise_for :users
  match 'users/:id' => 'users#show', as: :user

  get 'faq' => 'pages#faq'

  authenticated :user do
    root :to => "projects#index"
  end

 	resources :uploads, only: [:index, :new, :create]

  root :to => 'pages#home'

end
