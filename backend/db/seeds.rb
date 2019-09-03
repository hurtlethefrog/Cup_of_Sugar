# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts 'Seeding Data....'

community = Community.create(id: 5000, name: 'Mile End', postal_code: 'H2T')
household = Household.create(id: 5000, address: '8000 Honey Lane', postal_code: 'H2T 111', province: 'Quebec', city: 'Montreal')

admin = User.create(
  id: 5000, 
  first_name: 'AdminName',
  last_name: 'AdminSurname',
  profile_pic: Faker::Avatar.image,
  email: 'email@me.com',
  password: '123',
  phone_number:'11111111111',
  is_admin: true, 
  households_id: 5000
  )

neighbour = User.create(
    id: 6000,
    first_name: 'NeighbourName',
    last_name: 'NeighbourSurname',
    profile_pic: Faker::Avatar.image,
    email: 'neighbour@email.com',
    phone_number:Faker::PhoneNumber.cell_phone
    )

# Household.destroy_all

Household.create!([{
  address: '5733 Esplande Avenue',
  postal_code: 'H2T 2Z9',
  province: 'Quebec',
  city: 'Montreal'
},
{
  address: '5731 Waverley Street',
  postal_code: 'H2T 2Y2',
  province: 'Quebec',
  city: 'Montreal'
},
{
  address: '5977 Park Avenue',
  postal_code: 'H2V 4H4',
  province: 'Quebec',
  city: 'Montreal'
}])

# User.destroy_all

5.times do 
  User.create(
  households_id: '1',
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  password: "fjdlkfjlsdkf"
  )
end

3.times do 
  User.create(
  households_id: '2',
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  password: "fjdlkfjlsdkf"
  )
end

2.times do 
  User.create(
  households_id: '3',
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  password: "fjdlkfjlsdkf"
  )
end

# Event.destroy_all

Event.create(
  owner_id: '1',
  created_at: 10.days.ago,
  title: 'Event Lunch in the park', 
  location: 'Location for park',
  description: 'Description for park lunch', 
  start:Faker::Time.forward(days: 23, period: :morning), 
  end:Faker::Time.forward(days: 23, period: :morning) 
  )

Event.create(
  owner_id: '2',
  created_at: 20.days.ago,
  title: 'Barbeque at My Place', 
  location: 'Location for BBQ',
  description:'Description for BBQ', 
  start:Faker::Time.forward(days: 5, period: :morning), 
  end:Faker::Time.forward(days: 5, period: :morning 
))

Event.create(
  owner_id: '3',
  created_at: 5.days.ago,
  title: 'Gaming Night and Pizza', 
  location: 'Location for game',
  description:'Description for game night',
  start:Faker::Time.forward(days: 10, period: :evening), 
  end:Faker::Time.forward(days: 10, period: :evening) 
)

Event.create(
  owner_id: '4',
  created_at: 1.days.ago,
  title: 'Baby play date with my 3 year old', 
  location: 'Location for playdate',
  description:'Description for playdate', 
  start:Faker::Time.forward(days: 2, period: :morning), 
  end:Faker::Time.forward(days: 2, period: :morning 
))

EventUser.create(
  events_id: '1', 
  users_id: '1'
)
EventUser.create(
  events_id: '1', 
  users_id: '2'
)
EventUser.create(
  events_id: '1', 
  users_id: '2'
)
EventUser.create(
  events_id: '2', 
  users_id: '3'
)
EventUser.create(
  events_id: '2', 
  users_id: admin.id
)
EventUser.create(
  events_id: '2', 
  users_id: neighbour.id
)

OffersRequest.create(
  owner_id: admin.id, 
  created_at: 15.days.ago,
  title:'Offer title 1', 
  description:'Offer 1 Description',
  active: true, 
  offer: true
)

OffersRequest.create(
  owner_id: admin.id, 
  created_at: 10.days.ago,
  title:'Offer title 2', 
  description:'Offer 2 Description',
  active: true,
  offer: true
)

OffersRequest.create(
  owner_id: neighbour.id,
  created_at: 2.days.ago,
  title:'Offer title 3', 
  description:'Offer description 3',
  active: true,
  offer: true
)

OffersRequest.create(
  owner_id: neighbour.id,
  created_at: 5.days.ago,
  title:'Wanted title 1', 
  description:'Wanted description 1',
  active: true,
  offer: false
)

OffersRequest.create(
  owner_id: neighbour.id,
  created_at: 15.days.ago,
  title:'Wanted title 2', 
  description:'Wanted description 2',
  active: true,
  offer: false
)

# Notice.destroy_all

Notice.create([
  { user_id: '1',
  created_at: 10.days.ago,
  title: 'Notice title 1', 
  description: 'Notice description 1'},

  { user_id: '1',
  created_at: 5.days.ago,
  title: 'Notice title 2', 
  description: 'Notice description 2'},

  { user_id: '5000',
  created_at: 20.days.ago,
  title: 'Notice title 3', 
  description: 'Notice description 3'},
])

Comment.create([
  { comment: 'event comment 1 by user 1', 
  created_at: 1.days.ago,
  events_id: '1',
  users_id: '1' },

  { comment: 'event comment 2 by user 2', 
  created_at: 2.days.ago,
  events_id: '1',
  users_id: '2' },

  { comment: 'event comment 3 by user 2', 
  created_at: 3.days.ago,
  events_id: '1',
  users_id: '2' },

  { comment: 'event comment 3 by user 2', 
  created_at: 2.days.ago,
  events_id: '2',
  users_id: '5' },

  { comment: 'notice comment 1 by user 5', 
  created_at: 4.days.ago,
  notice_id: '1',
  users_id: '5' },

  { comment: 'notice comment 1 by user 1', 
  created_at: 2.days.ago,
  notice_id: '1',
  users_id: '1' },

  { comment: 'notice comment 2 by user 1', 
  created_at: 2.days.ago,
  notice_id: '2',
  users_id: '1' },

  { comment: 'notice comment 3 by user 1', 
  created_at: 3.days.ago,
  notice_id: '3',
  users_id: '1' },

  { comment: 'notice comment 3 by user 1', 
  created_at: 4.days.ago,
  notice_id: '3',
  users_id: '1' },

  { comment: 'notice comment 3 by admin', 
  created_at: 6.days.ago,
  notice_id: '3',
  users_id: admin.id },

  { comment: 'notice comment 3 by neighbour', 
  created_at: 2.days.ago,
  notice_id: '3',
  users_id: neighbour.id },

  { comment: 'offer/request comment 1 by neighbour', 
  created_at: 2.days.ago,
  offers_requests_id: '1',
  users_id: neighbour.id },

  { comment: 'offer/request comment 2 by neighbour', 
  created_at: 5.days.ago,
  offers_requests_id: '1',
  users_id: neighbour.id },

  { comment: 'offer/request comment 3 by admin', 
  created_at: 4.days.ago,
  offers_requests_id: '1',
  users_id: admin.id },
])



