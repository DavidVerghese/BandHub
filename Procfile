
web: set -o errexit

web: rm -rf public
web: npm install --prefix client && npm run build --prefix client
web:  cp -a client/build/. public/

web: bundle install
web: bundle exec rake db:migrate 
web: bundle exec rake db:seed