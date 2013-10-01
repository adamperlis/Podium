class AddPrivateToProjects < ActiveRecord::Migration
  
  def change
    add_column :projects, :private, :boolean, default: false
    Project.all.each { |project| project.update_attributes({ private: false})}
  end
end
