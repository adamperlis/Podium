class AddEmbedCodeToSlides < ActiveRecord::Migration
  def change
  	add_column :slides, :embed_code, :string
  end
end
