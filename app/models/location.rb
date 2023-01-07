class Location < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :user

  def self.random 
    Location.order(Arel.sql('RANDOM()')).first
  end

end
