class SlidesController < ApplicationController

	# def index
	# 	@slides = Slide.all

 #    respond_to do |format|
 #      format.html # index.html.erb
 #      format.json { render json: @slides }
 #      format.js
 #    end
 #  end

  def index
    @slides = Slide.order("position")
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

  def update
    @slide = Slide.find(params[:id])
    if @slide.update_attributes(params[:slide])
      render json: {status: "OK", slide: @slide }
    else
      render json: {status: "error"}
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

  def sort
    params[:slide].each_with_index do |id, index|
      Slide.update_all({position: index+1}, {id: id})
    end
    render nothing: true
  end

  def convert
    @slides = Slide.new_from_pdf(params[:pdf_url], params[:project_id])
    render json: {slides: @slides }
  end

  def cloudconvert
    @project = Project.find(params[:project_id])
    url = params[:slide][:filepicker_url]
    mimetype = params[:mimetype]
  
    c = Cloudconvert::Conversion.new

    if mimetype == "application/vnd.ms-powerpoint"

      message = c.convert("ppt", "pdf", url, { filename: 'test.ppt' })

      status = c.status

      @ccp = @project.cloud_convert_projects.new 
      @ccp.cc_id = message["id"]
      @ccp.save
      
      render json: {status: status, message: message }

    elsif mimetype == "application/vnd.openxmlformats-officedocument.presentationml.presentation"

      message = c.convert("pptx", "pdf", url, { filename: 'test.pptx' })

      status = c.status

      @ccp = @project.cloud_convert_projects.new 
      @ccp.cc_id = message["id"]
      @ccp.save
      
      render json: {status: status, message: message }

    elsif mimetype == "application/x-iwork-keynote-sffkey"

      message = c.convert("key", "pdf", url, { filename: 'test.key' })

      status = c.status

      @ccp = @project.cloud_convert_projects.new 
      @ccp.cc_id = message["id"]
      @ccp.save
      
      render json: {status: status, message: message }

    end
  end
end
