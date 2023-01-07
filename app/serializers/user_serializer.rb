class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :picture_url, :email_address, :genre_name, :instrument_name, :location_name, :looking_for

  # belongs_to :looking_for, class_name: 'Instrument'
  
  # have to have .object ins serializer
  def genre_name
    self.object.genre.name
  end 

  def instrument_name
    self.object.instrument.name
  end 

  def location_name
    self.object.location.name
  end

  def looking_for
    self.object.looking_for.name
  end

end

