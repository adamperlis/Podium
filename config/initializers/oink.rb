Rails.application.middleware.use Oink::Middleware

Rails.application.middleware.use( Oink::Middleware, :logger => Rails.logger )

Rails.application.middleware.use( Oink::Middleware, :instruments => :memory )

Rails.application.middleware.use( Oink::Middleware, :instruments => :activerecord )