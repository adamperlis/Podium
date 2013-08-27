class Project < ActiveRecord::Base
  attr_accessible :description, :image, :image_remote_url

  validates :description, :presence =>  true
  validates :user_id, :presence =>  true
  mount_uploader :image, ImageUploader

  belongs_to :user

  def image_remote_url=(url_value)
  	self.image = URI.parse(url_value) unless url_value.blank?
  	super
  end
end
