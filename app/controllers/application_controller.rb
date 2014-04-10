class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :capture_referral, unless: :signed_in?

  def capture_referral
  	session[:referral] = params[:referral] if params[:referral]
  end

  def sign_user_out
    sign_out if signed_in?
    redirect_to :root
  end
end
