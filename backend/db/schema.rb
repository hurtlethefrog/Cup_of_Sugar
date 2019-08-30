# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_30_202836) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "users_id"
    t.text "text"
    t.bigint "notices_id"
    t.bigint "offers_requests_id"
    t.bigint "events_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["events_id"], name: "index_comments_on_events_id"
    t.index ["notices_id"], name: "index_comments_on_notices_id"
    t.index ["offers_requests_id"], name: "index_comments_on_offers_requests_id"
    t.index ["users_id"], name: "index_comments_on_users_id"
  end

  create_table "communities", force: :cascade do |t|
    t.string "name"
    t.string "postal_code"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "event_users", force: :cascade do |t|
    t.bigint "events_id"
    t.bigint "users_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["events_id"], name: "index_event_users_on_events_id"
    t.index ["users_id"], name: "index_event_users_on_users_id"
  end

  create_table "events", force: :cascade do |t|
    t.bigint "users_id"
    t.string "title"
    t.text "description"
    t.datetime "start"
    t.datetime "end"
    t.string "location"
    t.string "image"
    t.boolean "cancelled"
    t.boolean "archived"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["users_id"], name: "index_events_on_users_id"
  end

  create_table "flaggeds", force: :cascade do |t|
    t.bigint "users_id"
    t.bigint "notices_id"
    t.bigint "offers_requests_id"
    t.bigint "events_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["events_id"], name: "index_flaggeds_on_events_id"
    t.index ["notices_id"], name: "index_flaggeds_on_notices_id"
    t.index ["offers_requests_id"], name: "index_flaggeds_on_offers_requests_id"
    t.index ["users_id"], name: "index_flaggeds_on_users_id"
  end

  create_table "households", force: :cascade do |t|
    t.bigint "communities_id"
    t.string "address"
    t.string "postal_code"
    t.string "province"
    t.string "city"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["communities_id"], name: "index_households_on_communities_id"
  end

  create_table "notices", force: :cascade do |t|
    t.bigint "users_id"
    t.string "title"
    t.string "description"
    t.boolean "archived"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["users_id"], name: "index_notices_on_users_id"
  end

  create_table "offers_requests", force: :cascade do |t|
    t.bigint "users_id"
    t.string "title"
    t.text "description"
    t.string "image"
    t.boolean "active"
    t.boolean "deleted"
    t.boolean "archived"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["users_id"], name: "index_offers_requests_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "households_id"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password"
    t.string "password_confirmation"
    t.string "profile_pic"
    t.string "phone_number"
    t.string "bio"
    t.string "private"
    t.boolean "is_admin"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["households_id"], name: "index_users_on_households_id"
  end

  add_foreign_key "comments", "events", column: "events_id"
  add_foreign_key "comments", "notices", column: "notices_id"
  add_foreign_key "comments", "offers_requests", column: "offers_requests_id"
  add_foreign_key "comments", "users", column: "users_id"
  add_foreign_key "event_users", "events", column: "events_id"
  add_foreign_key "event_users", "users", column: "users_id"
  add_foreign_key "events", "users", column: "users_id", name: "owner_id"
  add_foreign_key "flaggeds", "events", column: "events_id"
  add_foreign_key "flaggeds", "notices", column: "notices_id"
  add_foreign_key "flaggeds", "offers_requests", column: "offers_requests_id"
  add_foreign_key "flaggeds", "users", column: "users_id"
  add_foreign_key "households", "communities", column: "communities_id"
  add_foreign_key "notices", "users", column: "users_id", name: "owner_id"
  add_foreign_key "offers_requests", "users", column: "users_id", name: "owner_id"
  add_foreign_key "users", "households", column: "households_id"
end
