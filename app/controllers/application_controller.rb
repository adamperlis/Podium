class ApplicationController < ActionController::Base
  protect_from_forgery

  def sign_user_out
    sign_out if signed_in?
    redirect_to :root
  end
end
