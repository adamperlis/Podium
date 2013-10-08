class AddPasswordToProject < ActiveRecord::Migration
	change_table :projects do |t|
		t.add:password
  end
end
