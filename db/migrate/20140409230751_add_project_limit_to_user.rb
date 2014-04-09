class AddProjectLimitToUser < ActiveRecord::Migration
  def change
  	add_column :users, :project_limit, :integer, default: 5
  end
end
