# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"

# Load the SCM plugin appropriate to your project:
require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

require "capistrano/rbenv"
require "capistrano/rails"
require 'capistrano/rails/db'
require 'capistrano/nginx'
require 'capistrano/puma'
install_plugin Capistrano::Puma
install_plugin Capistrano::Puma::Nginx
require 'capistrano-nc/nc'
require 'capistrano/master_key'
require 'capistrano/yarn'
require 'capistrano-db-tasks'
require 'capistrano/rails/console'
require 'capistrano/rails_tail_log'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each { |r| import r }
