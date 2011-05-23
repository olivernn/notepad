task :cron => :environment do
  Note.delete_all
  Note.create(:title => "NotePad", :body => "A demo application for Davis.js")
end