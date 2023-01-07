class User < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :email_address, presence: true, uniqueness: true
  validates :picture_url, uniqueness: true

  belongs_to :genre
  belongs_to :instrument
  belongs_to :location
  belongs_to :looking_for, class_name: 'Instrument'
  has_secure_password
end

