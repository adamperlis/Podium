class Slide < ActiveRecord::Base
	acts_as_list

  attr_accessible :filepicker_url, :filepicker_url_thumb, :mimetype

  belongs_to :project
end