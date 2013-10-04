class AddAccessKeyToProjects < ActiveRecord::Migration
  def change
	  add_column :projects, :accesskey, :string
	end
end
