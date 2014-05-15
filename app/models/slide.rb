class Slide < ActiveRecord::Base
	acts_as_list

  attr_accessible :filepicker_url, :filepicker_url_thumb, :mimetype, :embed_code, :project_id

  belongs_to :project

  def self.new_from_pdf(pdf_url, project_id)
    full_pdf_url = prepend_http_if_needed(pdf_url)   
    image = create_imagelist_from_pdf(full_pdf_url)
    slides_array = []
    filename = full_pdf_url.split("/")[-1].split(".pdf")[0]

    (0..(image.length - 1)).each do |i| 
      obj = self.save_to_s3("#{filename}-#{i}.jpg", image[i])
      slide = self.new({
        mimetype: "image/jpg",
        project_id: project_id,
        filepicker_url: obj.url_for(:read, :expires => 60*60*24*365*20).to_s,
        filepicker_url_thumb: obj.url_for(:read, :expires => 60*60*24*365*20).to_s
      })
      slide.save!
      slides_array << slide
    end
    return slides_array
  end
  private

  def self.prepend_http_if_needed(url)
    u = URI.parse(url)
    if(!u.scheme)
      url = "http:#{url}"
    end
    return url
  end

  def self.save_to_s3(filename, image)
    obj = s3_bucket.objects[filename]
    image.format = "JPEG"
    image.resize_to_fit!(1920)
    obj.write(image.to_blob) 
    return obj
  end

  def self.s3_bucket
    s3 = AWS::S3.new({
      :access_key_id     => ENV['S3_KEY'],
      :secret_access_key => ENV['S3_SECRET']
    })
    bucket = s3.buckets['getpodium-media']
  end

  def self.create_imagelist_from_pdf(pdf)
    image = Magick::ImageList.new
    urlpdf = open(pdf)
    image.from_blob(urlpdf.read) do
      self.density = '300'
    end
    return image
  end
end