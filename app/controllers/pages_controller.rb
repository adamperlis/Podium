class PagesController < ApplicationController
  def home
  end

  def action 
    #asdfasdfadsf
  end

  def dashboard
  	@users = User.all
  	
 	end

 	def self.chart_data(start = 1.year.ago)
    total_count = total_count_by_month(start)
    start = start.to_date.beginning_of_month
    today = Date.today.beginning_of_month
    range = (start..today).select {|d| d.day == 1}
      range.map do |month|
        {
          created_at: month,
          total_signups: total_count[month] || 0
      }
    end
  end

  def self.total_count_by_month(start)
    signups = where(created_at: start.beginning_of_month..Time.now)
    signups = @users.group("date_trunc('month', created_at)")
    signups = @users.select("date_trunc('month', created_at) as created_at, count(*) as count")
    signups.each_with_object({}) do |signup, counts|
      counts[signup.created_at.to_date] = signup.count
    end
  end
end
