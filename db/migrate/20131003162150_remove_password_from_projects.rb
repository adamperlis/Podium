class RemovePasswordFromProjects < ActiveRecord::Migration
  change_table :projects do |t|
		t.remove :password
  end
end
