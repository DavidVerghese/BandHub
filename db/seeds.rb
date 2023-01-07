# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

100.times do 
  Genre.create(name: "#{Faker::Emotion.adjective} #{Faker::Music.genre}".downcase)
end

100.times do 
  Instrument.create(
    name: "#{
      if rand() < 0.1
        'bass' 
    elsif rand() < 0.2
      'baritone'
  elsif rand() < 0.3
    'tenor'
  elsif rand() < 0.4
    'contralto'
  elsif rand() < 0.5
    'alto'
  elsif rand() < 0.6
    'soprano'
  elsif rand() < 0.7
    'electric'
  elsif rand() < 0.8
    'acoustic'
    else
      'steel'
    end} #{Faker::Music.instrument}".downcase)
end

100.times do 
  Location.create(name: "#{Faker::Address.city}, #{Faker::Address.country}")
end

100.times do 
  User.create(name: Faker::Name.name, password_digest:'1234', picture_url: Faker::Twitter.user[:profile_image_url_https],email_address: Faker::Internet.email,genre_id:Genre.random.id,instrument_id:Instrument.random.id,location_id: Location.random.id)
end 