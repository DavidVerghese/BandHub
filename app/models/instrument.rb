class Instrument < ApplicationRecord
  # has_many :users, through: :looking_for, source: :user
  has_many :users, class_name: "User", foreign_key: "looking_for_id"

  validates :name, presence: true, uniqueness: true
  
  def self.random 
    Instrument.order(Arel.sql('RANDOM()')).first
  end
end
