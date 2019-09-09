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

ActiveRecord::Schema.define(version: 2019_09_09_203308) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "users_id"
    t.text "comment"
    t.bigint "offers_requests_id"
    t.bigint "events_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "notices_id"
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
    t.bigint "owner_id"
    t.string "title"
    t.text "description"
    t.datetime "start"
    t.datetime "end"
    t.string "location"
    t.string "image"
    t.boolean "cancelled", default: false
    t.boolean "archived", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "article_type", default: "event"
    t.index ["owner_id"], name: "index_events_on_owner_id"
  end

  create_table "flaggeds", force: :cascade do |t|
    t.bigint "users_id"
    t.bigint "offers_requests_id"
    t.bigint "events_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["events_id"], name: "index_flaggeds_on_events_id"
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
    t.string "title"
    t.text "description"
    t.boolean "archived", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "owner_id"
    t.string "article_type", default: "notice"
    t.index ["owner_id"], name: "index_notices_on_owner_id"
  end

  create_table "offers_requests", force: :cascade do |t|
    t.bigint "owner_id"
    t.string "title"
    t.text "description"
    t.string "image"
    t.boolean "active", default: true
    t.boolean "deleted", default: false
    t.boolean "archived", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "offer"
    t.string "article_type"
    t.index ["owner_id"], name: "index_offers_requests_on_owner_id"
  end

  create_table "users", force: :cascade do |t|
    t.bigint "households_id"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.string "profile_pic"
    t.string "phone_number"
    t.string "bio"
    t.string "private", default: "f"
    t.boolean "is_admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "preferred_contact"
    t.index ["households_id"], name: "index_users_on_households_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "comments", "events", column: "events_id"
  add_foreign_key "comments", "offers_requests", column: "offers_requests_id"
  add_foreign_key "comments", "users", column: "users_id"
  add_foreign_key "event_users", "events", column: "events_id"
  add_foreign_key "event_users", "users", column: "users_id"
  add_foreign_key "events", "users", column: "owner_id", name: "owner_id"
  add_foreign_key "flaggeds", "events", column: "events_id"
  add_foreign_key "flaggeds", "offers_requests", column: "offers_requests_id"
  add_foreign_key "flaggeds", "users", column: "users_id"
  add_foreign_key "households", "communities", column: "communities_id"
  add_foreign_key "notices", "users", column: "owner_id"
  add_foreign_key "offers_requests", "users", column: "owner_id", name: "owner_id"
  add_foreign_key "users", "households", column: "households_id"
end
