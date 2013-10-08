class AddPasswordToProject < ActiveRecord::Migration
	change_table :projects do |t|
		t.string :password
  end
end
