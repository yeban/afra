require 'yaml'
require 'logger'
require 'sequel'
require 'sinatra/base'
require 'puma/server'

module App

  class Routes < Sinatra::Base
    class << self
      ## OVERRIDE
      def middleware
        @middleware
      end

      def inherited(klass)
        super
        use klass
      end
      ## /OVERRIDE

      def config
        @@config
      end

      def config=(value)
        @@config = value
      end
    end

    enable  :logging

    disable :show_exceptions
  end

  class Server < Puma::Server

    attr_reader :binds

    def initialize(binds)
      @binds = binds
      super nil
    end

    def serve(app)
      self.app = app
      binder.parse binds, events
      run.join
    rescue Interrupt
      # swallow it
    end
  end

  extend self

  def init_config(config: 'config.yml')
    defaults = {
      'db_uri'=> 'postgres://localhost',
      'binds' => ['tcp://localhost:9292']
    }
    config  = YAML.load_file config if config.is_a? String
    @config = defaults.update config
  rescue Errno::ENOENT
    puts "Couldn't find file: #{config}."
  end

  def init_db
    @db = Sequel.connect config['db_uri'], loggers: Logger.new($stderr)
    @db.extension :pg_json
    @db.extension :pg_array
    Sequel.extension :pg_json_ops
  end

  def init_server
    @server = Server.new(config['binds'])
  end

  attr_reader :config, :db, :server

  def load_models
    init_db
    Sequel::Model.db = db
    Sequel::Model.plugin :json_serializer
    Dir['models/*.rb'].each do |model|
      require_relative model
    end
  rescue Sequel::DatabaseConnectionError
    puts "Couldn't connect to database."
    exit
  end

  def load_routes
    Routes.config = config
    Dir['routes/*.rb'].each do |route|
      require_relative route
    end
  end

  def migrate(version: nil, **options)
    init_config options
    init_db
    Sequel.extension :migration
    db.extension :constraint_validations
    Sequel::Migrator.apply(db, File.expand_path('migrations'), version)
  rescue Sequel::DatabaseConnectionError
    puts "Couldn't connect to database."
    exit
  end

  def irb(**options)
    init_config options
    load_models
    require 'irb'
    IRB.start
  end

  def serve(**options)
    init_config options
    load_models
    load_routes
    init_server
    server.serve(Routes)
  end
end
