class User < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :email_address, presence: true, uniqueness: true
  validates :picture_url, uniqueness: true

  belongs_to :genre, optional: true
  belongs_to :instrument, optional: true
  belongs_to :location, optional: true
  belongs_to :looking_for, class_name: 'Instrument', optional: true
  has_secure_password
end

