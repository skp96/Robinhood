# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_26_034528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "portfolio_joins", force: :cascade do |t|
    t.bigint "portfolios_id"
    t.bigint "stocks_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "shares", null: false
    t.index ["portfolios_id"], name: "index_portfolio_joins_on_portfolios_id"
    t.index ["stocks_id"], name: "index_portfolio_joins_on_stocks_id"
  end

  create_table "portfolios", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "buying_power", default: 1000000, null: false
    t.integer "portfolio_value", default: 1000000, null: false
    t.index ["user_id"], name: "index_portfolios_on_user_id", unique: true
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol", null: false
    t.string "name", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["symbol"], name: "index_stocks_on_symbol", unique: true
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "portfolio_id", null: false
    t.integer "stock_id", null: false
    t.integer "purchase_price", null: false
    t.integer "shares", null: false
    t.index ["portfolio_id"], name: "index_transactions_on_portfolio_id"
    t.index ["stock_id"], name: "index_transactions_on_stock_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "fname", null: false
    t.string "lname", null: false
    t.string "email", null: false
    t.string "username", null: false
    t.string "session_token", null: false
    t.string "password_digest", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "portfolio_joins", "portfolios", column: "portfolios_id"
  add_foreign_key "portfolio_joins", "stocks", column: "stocks_id"
end
