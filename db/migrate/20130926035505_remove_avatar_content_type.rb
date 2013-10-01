class RemoveAvatarContentType < ActiveRecord::Migration
	change_table :users do |t|
	  t.remove :avatar_content_type
	end
end
