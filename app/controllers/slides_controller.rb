class SlidesController < ApplicationController

	def index
		@slides = Slide.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @slides }
      format.js
    end
  end

	def create
		@project = Project.find(params[:project_id])
		@slide = @project.slides.new(params[:slide])
		if @slide.save
			render json: {status:"ok"}
		else
			render json: {status:"error"}
		end
	end
end
