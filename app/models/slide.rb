class Slide < ActiveRecord::Base
	acts_as_list

  attr_accessible :filepicker_url, :filepicker_url_thumb, :mimetype, :embed_code

  belongs_to :project

  def self.new_from_pdf(pdf_url, project_id)
  	image = Magick::ImageList.new
    urlpdf = open(pdf_url)
    image.from_blob(urlpdf.read)
    slides_array = []
    s3 = AWS::S3.new({
      :access_key_id     => ENV['S3_KEY'],
      :secret_access_key => ENV['S3_SECRET']
    })
    bucket = s3.buckets['getpodium-media']
    filename = pdf_url.split("/")[-1].split(".pdf")[0]

    (0..(image.length - 1)).each do |i| 
      obj = bucket.objects["#{filename}-#{i}.jpg"]
      image[i].format = "JPEG"
      obj.write(image[i].to_blob)
      slide = self.new(mimetype: "image/jpg")
      slide.project_id = project_id
      slide.filepicker_url = obj.url_for(:read, :expires => 60*60*24*365*20).to_s
      slide.filepicker_url_thumb = obj.url_for(:read, :expires => 60*60*24*365*20).to_s
      slide.save!
      slides_array << slide
    end
    slides_array
  end
end