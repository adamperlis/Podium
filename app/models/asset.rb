class Asset < ActiveRecord::Base
	belongs_to :post
	has_attached_File :asset, :styles => { :large => "1920x1080", :medium => "1280x720>", :thumb "260x260>" }	

  attr_accessible :asset_content_type, :asset_file_name, :asset_file_size, :asset_updated_at, :project_id
end
