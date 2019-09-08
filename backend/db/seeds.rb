# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts 'Seeding Data....'

community = Community.create(name: 'Mile End', postal_code: 'H2T')

household1 = Household.create(address: '8000 Honeypot Avenue', postal_code: 'H2T 111', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household2 = Household.create(address: '1 Sugarpot Street', postal_code: 'H2T 112', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household3 = Household.create(address: '3 Lemondrop Lane', postal_code: 'H2T 123', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household4 = Household.create(address: '4 Candycane Street', postal_code: 'H2T 133', province: 'Quebec', city: 'Montreal', communities_id: community.id)


admin = User.create(
  first_name: 'AdminName',
  last_name: 'AdminSurname',
  profile_pic: Faker::Avatar.image,
  email: 'email@me.com',
  # password_digest: '123',
  phone_number:'11111111111',
  is_admin: true, 
  households_id: household1.id,
  password: '11111111', 
  password_confirmation: '11111111'
  )

neighbour = User.create(
    first_name: 'NeighbourName',
    last_name: 'NeighbourSurname',
    profile_pic: Faker::Avatar.image,
    email: 'neighbour@email.com',
    phone_number:Faker::PhoneNumber.cell_phone, 
    households_id: household2.id, 
    is_admin: true,
    # password_digest: '123',
    password: '11111111', 
    password_confirmation: '11111111'
    )

# Household.destroy_all

Household.create([{
  communities_id: community.id,
  address: '5733 Esplande Avenue',
  postal_code: 'H2T 2Z9',
  province: 'Quebec',
  city: 'Montreal'
},
{
  communities_id: community.id,
  address: '5731 Waverley Street',
  postal_code: 'H2T 2Y2',
  province: 'Quebec',
  city: 'Montreal'
},
{
  communities_id: community.id,
  address: '5977 Park Avenue',
  postal_code: 'H2T 4H4',
  province: 'Quebec',
  city: 'Montreal'
}])

# User.destroy_all

5.times do 
  User.create(
  households_id: household3.id,
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  # password_digest: "fjdlkfjlsdkf"
  password: '11111111', 
  password_confirmation: '11111111'
  )
end

3.times do 
  User.create(
  households_id: household4.id,
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  # password_digest: "fjdlkfjlsdkf"
  password: '11111111', 
  password_confirmation: '11111111'
  )
end

2.times do 
  User.create(
  households_id: household1.id,
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  # password_digest: "fjdlkfjlsdkf"
  password: '11111111', 
  password_confirmation: '11111111'
  )
end

user1 = User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  # password_digest: "fjdlkfjlsdkf"
  password: '11111111', 
  password_confirmation: '11111111'
  )

user2 = User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  # password_digest: "fjdlkfjlsdkf"
  password: '11111111', 
  password_confirmation: '11111111'
  )

user3 = User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  # password_digest: "fjdlkfjlsdkf"
  password: '11111111', 
  password_confirmation: '11111111'
  )

# Event.destroy_all

event1 = Event.create(
  owner_id: admin.id,
  created_at: 10.days.ago,
  title: 'Event Lunch in the park', 
  location: 'Location for park',
  description: 'Description for park lunch', 
  start:Faker::Time.forward(days: 23, period: :morning), 
  end:Faker::Time.forward(days: 23, period: :morning) 
  )

event2 = Event.create(
  owner_id: user1.id,
  created_at: 20.days.ago,
  title: 'Barbeque at My Place', 
  location: 'Location for BBQ',
  description:'Description for BBQ', 
  start:Faker::Time.forward(days: 5, period: :morning), 
  end:Faker::Time.forward(days: 5, period: :morning 
))

event3 = Event.create(
  owner_id: user2.id,
  created_at: 5.days.ago,
  title: 'Gaming Night and Pizza', 
  location: 'Location for game',
  description:'Description for game night',
  start:Faker::Time.forward(days: 10, period: :evening), 
  end:Faker::Time.forward(days: 10, period: :evening) 
)

event4 = Event.create(
  owner_id: user3.id,
  created_at: 1.days.ago,
  title: 'Baby play date with my 3 year old', 
  location: 'Location for playdate',
  description:'Description for playdate', 
  start:Faker::Time.forward(days: 2, period: :morning), 
  end:Faker::Time.forward(days: 2, period: :morning 
))

EventUser.create(
  events_id: event1.id, 
  users_id: user1.id
)
EventUser.create(
  events_id: event2.id, 
  users_id: user2.id
)
EventUser.create(
  events_id: event2.id, 
  users_id: user3.id
)
EventUser.create(
  events_id: event2.id, 
  users_id: admin.id
)
EventUser.create(
  events_id: event1.id, 
  users_id: admin.id
)
EventUser.create(
  events_id: event4.id, 
  users_id: neighbour.id
)

offer1 = OffersRequest.create(
  owner_id: admin.id, 
  created_at: 15.days.ago,
  title:'Offer title 1', 
  description:'Offer 1 Description',
  article_type:'offer',
  active: true, 
  offer: true
)

offer2 = OffersRequest.create(
  owner_id: admin.id, 
  created_at: 10.days.ago,
  title:'Offer title 2', 
  description:'Offer 2 Description',
  article_type:'offer',
  active: true,
  offer: true
)

offer3 = OffersRequest.create(
  owner_id: user3.id,
  created_at: 2.days.ago,
  title:'Offer title 3', 
  description:'Offer description 3',
  article_type:'offer',
  active: true,
  offer: true
)

request1 = OffersRequest.create(
  owner_id: user2.id,
  created_at: 5.days.ago,
  title:'Wanted title 1', 
  description:'Wanted description 1',
  article_type:'request',
  active: true,
  offer: false
)

request2 = OffersRequest.create(
  owner_id: admin.id,
  created_at: 15.days.ago,
  title:'Wanted title 2', 
  description:'Wanted description 2',
  article_type:'request',
  active: true,
  offer: false
)

# Notice.destroy_all

notice1 = Notice.create(
  user_id: admin.id,
  created_at: 10.days.ago,
  title: 'Notice title 1', 
  description: 'Notice description 1'
)

notice2 = Notice.create(
  user_id: admin.id,
  created_at: 10.days.ago,
  title: 'Notice title 2', 
  description: 'Notice description 1'
)

notice3 = Notice.create( 
  user_id: user3.id,
  created_at: 5.days.ago,
  title: 'Notice title 3', 
  description: 'Notice description 2'
)

notice4 = Notice.create(
  user_id: user1.id,
  created_at: 20.days.ago,
  title: 'Notice title 4', 
  description: 'Notice description 3'
)

Comment.create([
  { comment: 'event comment', 
  created_at: 1.days.ago,
  events_id: event1.id,
  users_id: user1.id },

  { comment: 'event comment', 
  created_at: 2.days.ago,
  events_id: event2.id,
  users_id: user2.id },

  { comment: 'event comment', 
  created_at: 3.days.ago,
  events_id: event2.id,
  users_id: user3.id },

  { comment: 'event comment', 
  created_at: 2.days.ago,
  events_id: event2.id,
  users_id: admin.id },

  { comment: 'notice comment', 
  created_at: 4.days.ago,
  notices_id: notice1.id,
  users_id: admin.id },

  { comment: 'notice comment', 
  created_at: 2.days.ago,
  notices_id: notice3.id,
  users_id: user3.id },

  { comment: 'notice comment', 
  created_at: 2.days.ago,
  notices_id: notice1.id,
  users_id: user3.id },

  { comment: 'notice comment', 
  created_at: 3.days.ago,
  notices_id: notice1.id,
  users_id: user1.id },

  { comment: 'notice comment', 
  created_at: 4.days.ago,
  notices_id: notice2.id,
  users_id: admin.id},

  { comment: 'notice comment 3 by admin', 
  created_at: 6.days.ago,
  notices_id: notice3.id,
  users_id: admin.id },

  { comment: 'notice comment 3 by neighbour', 
  created_at: 2.days.ago,
  notices_id: notice4.id,
  users_id: user3.id },

  { comment: 'offer comment 1 by neighbour', 
  created_at: 2.days.ago,
  offers_requests_id: offer1.id,
  users_id: user2.id },

  { comment: 'request comment 2 by neighbour', 
  created_at: 5.days.ago,
  offers_requests_id: request1.id,
  users_id: user3.id },

  { comment: 'request comment 3 by admin', 
  created_at: 4.days.ago,
  offers_requests_id: request2.id,
  users_id: admin.id },
])



