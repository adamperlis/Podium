class Slide < ActiveRecord::Base
	acts_as_list

  attr_accessible :filepicker_url

  belongs_to :project
end