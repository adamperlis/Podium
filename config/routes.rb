Omrails::Application.routes.draw do

  resources :projects do
  get 'browse', :on => :collection
  post 'authorize', :on => :member # POST /projects/:id/authorize
  get 'authorize', :on => :member # GET /projects/:id/authorize
  
  end
  
  resources :slides do 
    collection {post :sort}
  end

  devise_for :users
  resources :users, only: [:show, :update]

  get 'faq' => 'pages#faq'
  get 'pricing' => 'pages#pricing'

  authenticated :user do
    root :to => "projects#index"
  end

  get 'sign_out' => 'application#sign_user_out'

  root :to => 'pages#home'


end
