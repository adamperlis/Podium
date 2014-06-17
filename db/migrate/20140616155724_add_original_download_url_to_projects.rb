class AddOriginalDownloadUrlToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :original_download_url, :string
  end
end

