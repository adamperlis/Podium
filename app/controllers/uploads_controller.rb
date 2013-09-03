class UploadsController < ApplicationController

  def new
    @upload = Upload.new
  end

  def create
    Upload.create(params[:upload])
    redirect_to filepicker_url
  end

  def index
    @uploads = Upload.all
  end

end