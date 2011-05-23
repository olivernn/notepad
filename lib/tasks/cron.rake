task :cron => :environment do
  Note.delete_all
end