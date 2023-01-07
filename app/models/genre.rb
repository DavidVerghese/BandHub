class Genre < ApplicationRecord
  has_many :users
  validates :name, presence: true, uniqueness: true

  def self.random 
    Genre.order(Arel.sql('RANDOM()')).first
  end
end
