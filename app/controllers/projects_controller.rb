class ProjectsController < ApplicationController
  before_filter :redirect_if_not_signed_in, except: [:show,:authorize]

  # GET /projects
  # GET /projects.json
  def index
    @projects = current_user.projects.search(params[:search]).order("created_at desc").page(params[:page]).per_page(8)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects }
      format.js
    end
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])

    if @project.private && !is_owner?(@project)
      return redirect_to authorize_project_path(@project)
    else
      @project.increment! :clicks
      @project.save

      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @project }
      end
    end
  end

  def authorize
    @project = Project.find(params[:id])

    if !@project.private || is_owner?(@project)
      return redirect_to project_path(@project)
    end

    if params[:accesskey] == @project.accesskey

      @project.increment! :clicks
      @project.save

      respond_to do |format|
        format.html { render action: "show" }
        format.json { render json: @project }
      end
    else
      respond_to do |format|
      format.html { render action: "password" }
      format.json { head :no_content }
      end
    end
  end

  # GET /projects/new
  # GET /projects/new.json
  def new
   @project = current_user.projects.create
   redirect_to edit_project_path(@project)
    
  end

  # GET /projects/1/edit
  def edit
    @project = current_user.projects.find(params[:id])
    @slides = @project.slides.order("position")
    # @user = User.project.slide.find(params[:id])
    
  end
  

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    puts params
    @project = current_user.projects.find(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to edit_project_path, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = current_user.projects.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :no_content }
    end
  end

  def browse
    @projects = Project.where("private != 't'").search(params[:search]).order("created_at desc").page(params[:page]).per_page(8)
    @project = Project.where("accesskey == accesskey")

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @projects }
      format.js
    end
  end


  private

  def redirect_if_not_signed_in
    unless user_signed_in?
      redirect_to root_path
    end
  end

  def is_owner?(project)
    signed_in? && current_user == project.user
  end
end


