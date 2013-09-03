class Upload < ActiveRecord::Base
  attr_accessible :filepicker_url

  belongs_to :project
end