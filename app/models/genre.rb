class Genre < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  def self.random 
    Genre.order(Arel.sql('RANDOM()')).first
  end
end
