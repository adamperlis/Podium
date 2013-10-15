class AddTransitionToProjects < ActiveRecord::Migration
  def change
  	add_column :projects, :transition, :integer
  end
end
