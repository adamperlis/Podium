class AddFilepickerUrlThumbBackToDb < ActiveRecord::Migration
  change_table :slides do |t|
		t.string:filepicker_url_thumb
  end
end
