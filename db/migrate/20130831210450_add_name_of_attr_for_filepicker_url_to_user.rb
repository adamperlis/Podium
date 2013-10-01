class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration

  def up
    add_column :user, :filepicker_url_avatar, :string
  end

  def down
    remove_column :user, :filepicker_url_avatar
  end
end