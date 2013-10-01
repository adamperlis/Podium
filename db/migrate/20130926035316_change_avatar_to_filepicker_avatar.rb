class ChangeAvatarToFilepickerAvatar < ActiveRecord::Migration
	change_table :users do |t|
		t.remove :avatar_file_name
		t.remove :avatar_file_content_type
		t.remove :avatar_file_size
		t.remove :avatar_updated_at
		t.string :filepicker_url_avatar
  end
end
