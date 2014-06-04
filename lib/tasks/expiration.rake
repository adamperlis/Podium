

desc "This task deletes admin projects older than one day"
task :expire_projects => :environment do
	superuser = User.where(admin:true).first
	projects = superuser.projects.where( "created_at < ?" , 1.day.ago  )
	projects.destroy_all
end