Omrails::Application.routes.draw do

  resources :projects do
  get 'browse', :on => :collection
  end
  
  resources :slides do 
    collection {post :sort}
  end

  devise_for :users
  resources :users, only: [:show, :update]

  get 'faq' => 'pages#faq'

  authenticated :user do
    root :to => "projects#index"
  end

  root :to => 'pages#home'

end
