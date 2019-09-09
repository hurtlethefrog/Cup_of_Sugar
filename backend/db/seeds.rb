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
community1 = Community.create(name: 'Montreal-Nord', postal_code: 'H2V')
community2 = Community.create(name: 'Saint-Laurent', postal_code: 'H4K')

household1 = Household.create(address: '8000 Honeypot Avenue', postal_code: 'H2T 111', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household2 = Household.create(address: '1 Sugarpot Street', postal_code: 'H2T 112', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household3 = Household.create(address: '3 Lemondrop Lane', postal_code: 'H2T 123', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household4 = Household.create(address: '4 Candycane Street', postal_code: 'H2T 133', province: 'Quebec', city: 'Montreal', communities_id: community.id)
household5 = Household.create(address: '4 Sweet Melon Street', postal_code: 'H2T 134', province: 'Quebec', city: 'Montreal', communities_id: community.id)

admin = User.create(
  first_name: 'Frankie',
  last_name: 'George',
  profile_pic: Faker::Avatar.image,
  email: 'Frankie@me.com',
  phone_number:'11111111111',
  is_admin: true, 
  households_id: household1.id,
  password: '11111111', 
  password_confirmation: '11111111'
  )

neighbour = User.create(
    first_name: 'Louise',
    last_name: 'Smith',
    profile_pic: Faker::Avatar.image,
    email: 'Louise@email.com',
    phone_number:Faker::PhoneNumber.cell_phone, 
    households_id: household2.id, 
    is_admin: true,
    password: '11111111', 
    password_confirmation: '11111111'
    )

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

3.times do 
  User.create(
  households_id: household3.id,
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
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
  password: '11111111', 
  password_confirmation: '11111111'
  )

user2 = User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  password: '11111111', 
  password_confirmation: '11111111'
  )

user3 = User.create(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  profile_pic: Faker::Avatar.image,
  email: Faker::Internet.email,
  phone_number:Faker::PhoneNumber.cell_phone, 
  password: '11111111', 
  password_confirmation: '11111111'
  )

event1 = Event.create(
  owner_id: admin.id,
  created_at: 10.days.ago,
  title: 'Lunch in the Park', 
  location: 'TBC',
  description: 'The days are getting cooler, lets meet up in the park for lunch. BYO drinks and a plate to share', 
  start:Faker::Time.forward(days: 23, period: :morning), 
  end:Faker::Time.forward(days: 23, period: :morning) 
  )

event2 = Event.create(
  owner_id: user1.id,
  created_at: 20.days.ago,
  title: 'Barbeque at My Place', 
  location: 'My house!',
  description:'We have a new BBQ! Let\'s fire it up!', 
  start:Faker::Time.forward(days: 5, period: :evening), 
  end:Faker::Time.forward(days: 5, period: :evening 
))

event3 = Event.create(
  owner_id: user2.id,
  created_at: 5.days.ago,
  title: 'Gaming Night and Pizza', 
  location: 'TBC',
  description:'Let\'s play some games and get to know each other.',
  start:Faker::Time.forward(days: 10, period: :evening), 
  end:Faker::Time.forward(days: 10, period: :evening) 
)

event4 = Event.create(
  owner_id: user3.id,
  created_at: 1.days.ago,
  title: 'Baby play date with my 3 year old', 
  location: 'TBC, depending on the weather',
  description:'A morning catch up for the babies to play and the parents to chat!', 
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
  title:'Lawn Mower', 
  description:'Available most weekends just contact me',
  article_type:'offer',
  active: true, 
  offer: true
)

offer2 = OffersRequest.create(
  owner_id: admin.id, 
  created_at: 10.days.ago,
  title:'Chocolate Fountain', 
  description:'A hit at any event, contact me for info',
  article_type:'offer',
  active: true,
  offer: true
)

offer3 = OffersRequest.create(
  owner_id: user3.id,
  created_at: 2.days.ago,
  title:'Ladder', 
  description:'Great for reaching high places!',
  article_type:'offer',
  active: true,
  offer: true
)

request1 = OffersRequest.create(
  owner_id: user2.id,
  created_at: 5.days.ago,
  title:'Ski Gear', 
  description:'First time skiing anything we could borrow would be great!',
  article_type:'request',
  active: true,
  offer: false
)

request2 = OffersRequest.create(
  owner_id: admin.id,
  created_at: 15.days.ago,
  title:'Old Tape Deck', 
  description:'Found some old casettes, does anyone have a tape player?',
  article_type:'request',
  active: true,
  offer: false
)

# Notice.destroy_all

notice1 = Notice.create(
  owner_id: admin.id,
  created_at: 10.days.ago,
  title: 'Raccoons spotted in the neighbourhood!', 
  description: 'Don\'t forget to lock your bins'
)

notice2 = Notice.create(
  owner_id: admin.id,
  created_at: 10.days.ago,
  title: 'Lost cat', 
  description: 'Black and White, answers to Pudding, last seen on the weekend near the park.'
)

notice3 = Notice.create( 
  owner_id: user3.id,
  created_at: 5.days.ago,
  title: 'Just moved to the neighbourhood', 
  description: 'Looking forward to being a part of the community'
)

notice4 = Notice.create(
  owner_id: user1.id,
  created_at: 20.days.ago,
  title: 'Half price coffee', 
  description: 'Tim\'s coffee bar has half priced coffee on Wednesday afternoon'
)

Comment.create([
  { comment: 'I\'ll be there!', 
  created_at: 1.days.ago,
  events_id: event1.id,
  users_id: user1.id },

  { comment: 'Looking forward to it', 
  created_at: 2.days.ago,
  events_id: event2.id,
  users_id: user2.id },

  { comment: 'Will hopefully make it to the next event!', 
  created_at: 3.days.ago,
  events_id: event2.id,
  users_id: user3.id },

  { comment: 'I\'m away! Next time for sure!', 
  created_at: 2.days.ago,
  events_id: event2.id,
  users_id: admin.id },

  { comment: 'Thanks for the tip', 
  created_at: 4.days.ago,
  notices_id: notice1.id,
  users_id: admin.id },

  { comment: 'Good to know, Thank you.', 
  created_at: 2.days.ago,
  notices_id: notice3.id,
  users_id: user3.id },

  { comment: 'Darn Trash Pandas!', 
  created_at: 2.days.ago,
  notices_id: notice1.id,
  users_id: user3.id },

  { comment: 'Thanks for letting us know', 
  created_at: 3.days.ago,
  notices_id: notice1.id,
  users_id: user1.id },

  { comment: 'Will keep an eye out!', 
  created_at: 4.days.ago,
  notices_id: notice2.id,
  users_id: admin.id},

  { comment: 'Welcome!', 
  created_at: 6.days.ago,
  notices_id: notice3.id,
  users_id: admin.id },

  { comment: 'Amazing! It\'s great coffee too!', 
  created_at: 2.days.ago,
  notices_id: notice4.id,
  users_id: user3.id },

  { comment: 'Thanks, We were just considering buying a new one', 
  created_at: 2.days.ago,
  offers_requests_id: offer1.id,
  users_id: user2.id },

  { comment: 'We have some children\'s gear I\'ll give you a call!', 
  created_at: 5.days.ago,
  offers_requests_id: request1.id,
  users_id: user3.id },

  { comment: 'I think I do! I\'ll take a look in the garage on the weekend', 
  created_at: 4.days.ago,
  offers_requests_id: request2.id,
  users_id: user2.id },
])



