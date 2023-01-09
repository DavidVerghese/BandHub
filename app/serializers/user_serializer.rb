class UserSerializer < ActiveModel::Serializer
  # byebug
  attributes :id, :name, :picture_url, :email_address, :genre_name, :instrument_name, :location_name, :looking_for

  # belongs_to :looking_for, class_name: 'Instrument'
  
  # have to have .object ins serializer
  belongs_to :genre
  belongs_to :instrument
  belongs_to :location
  belongs_to :looking_for

  def genre_name
    if self.object.genre
      self.object.genre.name
    end
    
  end 

  def instrument_name
    if self.object.instrument
      self.object.instrument.name
    end
  end 

  def location_name
    if self.object.location
      self.object.location.name
    end
  end

  # def looking_for
  #   if self.object.looking_for
  #     self.object.looking_for.name
  #   end
  # end

end

