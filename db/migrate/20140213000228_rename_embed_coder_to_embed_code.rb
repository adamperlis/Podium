class RenameEmbedCoderToEmbedCode < ActiveRecord::Migration
  def change
  	rename_column :slides, :embed_coder, :embed_code
  end
end
