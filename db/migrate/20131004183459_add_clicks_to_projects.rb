class AddClicksToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :clicks, :integer
  end
end
