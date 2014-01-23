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
    image = Magick::ImageList.new
    urlpdf = open(params[:pdf_url])
    image.from_blob(urlpdf.read)
    s3 = AWS::S3.new({
      :access_key_id => 'AKIAJ4B3SNYXFWRSCVMQ', 
      :secret_access_key => '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'
    })
    bucket = s3.buckets['getpodium-media']
    filename = params[:pdf_url].split("/")[-1].split(".pdf")[0]

    (0..(image.length - 1)).each do |i| 
      bucket.objects["#{filename}-#{i}.png"].write(image[i].to_blob)
    end
  end
end
