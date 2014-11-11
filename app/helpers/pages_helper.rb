module PagesHelper
	def featured_presentations
		if ENV['FEATURED_PRESENTATIONS'].present?
			JSON.parse ENV['FEATURED_PRESENTATIONS']
		else
			[]
		end
	end
end
