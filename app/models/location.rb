class Location < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  def self.random 
    Location.order(Arel.sql('RANDOM()')).first
  end
  
end
