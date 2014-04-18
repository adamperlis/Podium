class UserMailer < ActionMailer::Base
 
	default from: "Podium <adam@getpodium.com>"

  def referral_thankyou(user)
  	@user = user
    mail :to => user.email, :subject => "Thanks #{user.name} :-)"
  end
end
