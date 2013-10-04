class AddThumbnailToSlides2 < ActiveRecord::Migration
	def change
	  add_column :slides, :filepicker_url_thumb, :string
	  add_index :slides, :filepicker_url_thumb
	end
end