class Project < ActiveRecord::Base

  attr_accessible :description, :image, :image_remote_url,
  :filepicker_url, :filepicker_url_thumb, :filepicker_url_avatar,
  :private, :accesskey, :transition,
  :download, :original_download_url

  validates :description, presence: true
  validates :user_id, presence: true
  has_attached_file :image
  validates_attachment :image, content_type: { content_type:
  ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] },
  size: { less_than: 20.megabytes }

  belongs_to :user

  has_many :slides
  before_validation :set_default_description

  has_many :cloud_convert_projects

  def image_remote_url=(url_value)
  	self.image = URI.parse(url_value) unless url_value.blank?
  	super
  end

  def set_default_description
    self.description = "Untitled Project" if description.blank?
  end

  def self.search(search)
  if search
    where('description LIKE ?', "%#{search}%")
  else
    scoped
  end
  end
end
