class CloudConvertProject < ActiveRecord::Migration
  def self.up
    create_table :cloud_convert_projects do |t|
      t.belongs_to :project
      t.integer :cc_id
      t.timestamps
    end
  end
  # Drop table
  def self.down
    drop_table :cloud_convert_projects
  end
end
