class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, 
         :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name, :filepicker_url_avatar, :referral_code, :project_limit
  # attr_accessible :title, :body

  has_many :projects

  after_create :give_referral_points

  def give_referral_points
    unless referral_code.blank?
      match = referral_code.match(/podium-(\d+)/)
      if match
        user = User.find(match[1].to_i)
        user.project_limit+=1 if user.project_limit <= 10
        user.save!
      end
    end 
  end

end
