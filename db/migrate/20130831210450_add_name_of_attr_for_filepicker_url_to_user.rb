class AddNameOfAttrForFilepickerUrlToUser < ActiveRecord::Migration

  def change
    create_table :uploads do |t|
      t.string :filepicker_url
      t.timestamps
    end
  end
end