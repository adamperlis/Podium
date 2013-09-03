class SlidesController < ApplicationController
 
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
