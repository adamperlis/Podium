$(function (){

  var filepicker_avatar = function(InkBlob){
    console.log(JSON.stringify(InkBlob));
    var user_id = parseInt($(".avatar-button").data("user-id"));
    filepicker.convert(InkBlob, {width: 55, height: 55, fit: 'scale'}, function(avatar_InkBlob){
      
      $.ajax({
        url: '/users/' + user_id,
        type: 'PUT',
        data: { user: { filepicker_url_avatar: avatar_InkBlob.url }},
        success: function(data) {
          var url = avatar_InkBlob.url;

          $(".avatar-container").html($("<img>").attr('src', url));
          console.log(data);
        }
      });
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
