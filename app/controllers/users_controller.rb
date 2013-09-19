class UsersController < ApplicationController
  def show
  	 @user = User.find(params[:id])
  	 @projects = @user.projects.page(params[:page]).per_page(8)
  end

  # def create
  # 	 @user = User.create( params[:user] )
  # end
end
