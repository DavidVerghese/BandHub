class Instrument < ApplicationRecord
  # has_many :users, through: :looking_for, source: :user

  validates :name, presence: true, uniqueness: true
  
  def self.random 
    Instrument.order(Arel.sql('RANDOM()')).first
  end
end
