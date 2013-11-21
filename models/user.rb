require 'bcrypt'

class User < Sequel::Model

  one_to_many  :access_token

  def password=(plain)
    super BCrypt::Password.create plain
  end

  def authenticate(plain)
    BCrypt::Password.new(password) == plain
  end
end
