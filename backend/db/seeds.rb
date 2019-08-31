# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts "Seeding Data...."


community = Community.create(id: 5000, name: 'Mile End', postal_code: 'H2T')
household = Household.create(id: 5000, address: '8000 Honey Lane', postal_code: 'H2T 111', province: 'Quebec', city: 'Montreal')

admin = User.create(
  id: 5000, 
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: 'email@me.com',
  password: '123',
  phone_number:Faker::PhoneNumber.cell_phone,
  is_admin: true, 
  households_id: household.id
  )

neighbour = User.create(
    id: 600,
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    profile_pic: Faker::Avatar.image,
    email: Faker::Internet.email,
    phone_number:Faker::PhoneNumber.cell_phone
    )

# Household.destroy_all

Household.create!([{
  communities_id: 5000,
  address: '5733 Esplande Avenue',
  postal_code: 'H2T 2Z9',
  province: 'Quebec',
  city: 'Montreal'
},
{
  communities_id: 5000,
  address: '5731 Waverley Street',
  postal_code: 'H2T 2Y2',
  province: 'Quebec',
  city: 'Montreal'
},
{
  communities_id: 5000,
  address: '5977 Park Avenue',
  postal_code: 'H2V 4H4',
  province: 'Quebec',
  city: 'Montreal'
}])

# User.destroy_all

10.times do 
  User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone
  )
end

User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone,
  households_id: '1'
  )

  User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone,
  households_id: '2'
  )

  User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone,
  households_id: '3'
  )

  User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone,
  households_id: '1'
  )

  User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone
  )
# Event.destroy_all

Event.create(
  title: 'Lunch in the park', 
  description:Faker::TvShows::Seinfeld.quote, 
  location: 'Greenfield Park by the pond',
  start:Faker::Time.forward(days: 23, period: :morning), 
  end:Faker::Time.forward(days: 23, period: :morning) 
  )

Event.create(
  title: 'Barbeque at My Place', 
  location: 'TBA',
  description:Faker::TvShows::Seinfeld.quote, 
  start:Faker::Time.forward(days: 5, period: :morning), 
  end:Faker::Time.forward(days: 5, period: :morning) 
)

Event.create(
  title: 'Gaming Night and Pizza', 
  location: 'TBA',
  description:Faker::TvShows::Seinfeld.quote, 
  start:Faker::Time.forward(days: 10, period: :evening), 
  end:Faker::Time.forward(days: 10, period: :evening) 
)

Event.create(
  title: 'Baby play date with my 3 year old', 
  location: 'TBA',
  description:Faker::TvShows::Seinfeld.quote, 
  start:Faker::Time.forward(days: 2, period: :morning), 
  end:Faker::Time.forward(days: 2, period: :morning) 
)

OffersRequest.create(
  owner_id: admin.id, 
  title:Faker::Commerce.product_name, 
  description:'Available over the weekend',
  active: true, 
  offer: true
)

OffersRequest.create(
  owner_id: admin.id, 
  title:Faker::Commerce.product_name, 
  description:'Pop me a message to borrow it anytime!',
  active: true,
  offer: true
)

OffersRequest.create(
  owner_id: neighbour.id,
  title:Faker::Commerce.product_name, 
  description:'It\'s really fun for the whole family, would love to share it around!',
  active: true,
  offer: true
)

OffersRequest.create(
  owner_id: neighbour.id,
  title:Faker::Commerce.product_name, 
  description:'I would really appreciate anyone letting me know!',
  active: true,
  offer: false
)

OffersRequest.create(
  owner_id: neighbour.id,
  title:Faker::Commerce.product_name, 
  description:'Fingers crossed I find something before the winter is over!! TIA',
  active: true,
  offer: false
)

# Notice.destroy_all

Notice.create(
  title: 'Interesting Note', 
  description: 'Muffins are half price every Monday at Lazy Susan\'s Muffin Emporium! Best Muffins of my life!'
)

Notice.create(
  title: 'Missing Cat', 
  description: 'Large grey tabby. Please look out for her around the parks. Has a bell and answers to the name Samantha'
)

Notice.create(
  title: 'Raccoons are out!', 
  description: 'Please remember to lock your bins or take them out in the morning. There are racoons around the area'
)

Comment.create(
  comment: 'comment 1', 
  events_id: '1'
)

Comment.create(
  comment: 'another comment', 
  events_id: '2'
)



