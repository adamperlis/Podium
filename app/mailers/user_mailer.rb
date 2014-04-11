class UserMailer < ActionMailer::Base
  include SendGrid
  sendgrid_category :use_subject_lines
  sendgrid_enable   :ganalytics, :opentrack
  sendgrid_unique_args :key1 => "value1", :key2 => "value2"

  def welcome_message(user)
    sendgrid_category "Referral"
    sendgrid_unique_args :key2 => "newvalue2", :key3 => "value3"
    mail :to => user.email, :subject => "Thanks #{user.name} :-)"
  end
end
