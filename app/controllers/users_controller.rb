class UsersController < ApplicationController
  def show
  	 @user = User.find(params[:id])
  	 @projects = @user.projects.page(params[:page]).per_page(8)
  end
end
