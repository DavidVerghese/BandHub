class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :picture_url
      t.string :email_address
      t.references :genre, foreign_key: true
      t.references :instrument, foreign_key: true
      t.references :location, foreign_key: true

      t.timestamps
    end
  end
end
