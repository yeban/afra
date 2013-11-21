desc 'Setup'
task 'setup' do
  puts 'installing gems ...'
  system("gem install --file Gemfile")

  puts 'installing bower packages ...'
  system("which bower > /dev/null 2>&1") or system ("npm install -g bower")
  system("bower install")
end

task default: :setup
