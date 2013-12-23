class Feature < Sequel::Model

  one_to_many :tasks
end
