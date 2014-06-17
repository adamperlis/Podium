class AddDownloadCheckboxToProjectsModel < ActiveRecord::Migration
 def change
    add_column :projects, :download, :boolean, default: true
  end
end
