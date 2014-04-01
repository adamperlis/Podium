$(function (){

  var filepicker_avatar = function(InkBlob){
    console.log(JSON.stringify(InkBlob));
    filepicker.convert(InkBlob, {width: 55, height: 55, fit: 'scale'}, function(avatar_InkBlob){
      
          var url = avatar_InkBlob.url;

          $(".avatar-container").html($("<img>").attr('src', url));
          $("input[id=avatar-url]").val(url);
    });
  };

  var addavatar = $('.avatar-button');
    addavatar.click(function(e){
      e.preventDefault();
      filepicker.pick({
        services:['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'URL', 'FACEBOOK', 'INSTAGRAM']
    }, filepicker_avatar);
  });

});
