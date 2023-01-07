class AddLookingForToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :users, :looking_for, foreign_key: { to_table: :instruments }
  end
end
