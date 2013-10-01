class UsersController < ApplicationController

  def show
  	 @user = User.find(params[:id])
  	 @projects = @user.projects.page(params[:page]).per_page(8)
  end

  def update
		@user = User.find(params[:id])
		if @user.update_attributes(params[:user])
  	 	render json: {status: "ok", user: @user }
		else
			render json: {status:"error"}
		end
  end
end
