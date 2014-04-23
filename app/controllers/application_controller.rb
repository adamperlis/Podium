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

  def default_url_options(options = {})
  	options.merge!(host: ENV["BASE_URL"], port: 80) if ENV["BASE_URL"].present?
  	options
  end
end
