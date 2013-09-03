class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration

  def up
    add_column :user, :filepicker_url, :string
  end

  def down
    remove_column :user, :filepicker_url
  end
end