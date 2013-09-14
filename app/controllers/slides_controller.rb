class SlidesController < ApplicationController

	def index
		@slides = Slide.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @slides }
      format.js
    end
  end

  def show
  	@slide = Slide.find(params[:id])

  	respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @slide }
      format.js
     end
  end

	def create
		@project = Project.find(params[:project_id])
		@slide = @project.slides.new(params[:slide])
		if @slide.save
			render json: {status: @slide }
		else
			render json: {status:"error"}
		end
	end

	def destroy
    @slide = Slide.find(params[:id])
    @project = @slide.project
    @slide.destroy

    respond_to do |format|
      format.html { redirect_to edit_project_url(@project) }
      format.json { head :no_content }
    end
  end
end
