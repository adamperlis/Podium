class SetTransitionToBetterDefault < ActiveRecord::Migration
  def up
  	change_column :projects, :transition, :integer, default: 1
  	Project.update_all({transition: 1}, {transition: nil})
  end

  def down
  	change_column :projects, :transition, :integer, default: nil
  end
end
