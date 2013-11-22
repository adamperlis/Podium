class AddEmbedCodeToSlides < ActiveRecord::Migration
  def change
  	add_column :slides, :embed_coder, :string
  end
end
