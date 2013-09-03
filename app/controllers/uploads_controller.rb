class UploadsController < ApplicationController

  def index
    @uploads = Upload.all
  end

  def new
    @upload = Upload.new
  end

  def create
    Upload.create(params[:upload])
    redirect_to filepicker_url
  end


end