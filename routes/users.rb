class Users < App::Routes
  before do
    content_type 'application/json'
  end

  get '/data/users/:id' do
    'test'
  end
end
