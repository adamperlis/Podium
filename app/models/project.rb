class Project < ActiveRecord::Base
attr_accessible :description, :image, :image_remote_url, :filepicker_url, :avatar

  validates :description, presence: true
  validates :user_id, presence: true
  validates_attachment :image, content_type: { content_type: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'] }, size: { less_than: 20.megabytes }

  belongs_to :user
  has_attached_file :image, styles: { thumb: "260x260>"}

  has_many :slides
  before_validation :set_default_description

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
