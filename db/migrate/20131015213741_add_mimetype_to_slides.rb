class AddMimetypeToSlides < ActiveRecord::Migration
  def change
  	add_column :slides, :mimetype, :string
  end
end
