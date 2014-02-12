class ChangeAvatarToFilepickerAvatar < ActiveRecord::Migration
	change_table :users do |t|
		t.string :filepicker_url_avatar
  end
end
