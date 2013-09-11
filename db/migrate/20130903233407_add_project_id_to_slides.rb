class AddProjectIdToSlides < ActiveRecord::Migration
def change
  add_column :slides, :project_id, :integer
  add_index :slides, :project_id
  end
end
