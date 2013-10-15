class AddTransistionToSlides < ActiveRecord::Migration
  def change
  	add_column :slides, :transition, :integer
  end
end
