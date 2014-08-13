class PagesController < ApplicationController
  before_filter :admins_only, only: [:dashboard]

  def home
  end

  def action 
    #asdfasdfadsf
  end

  def dashboard
  	@users = User.all
  	
 	end

  private

  def admins_only
    if !signed_in? || !current_user.admin?
      redirect_to root_path, notice: "You don't have access to this page"
    end
  end
end
