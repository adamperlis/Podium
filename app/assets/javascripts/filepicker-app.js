$(function (){
  filepicker.setKey('ALcB7Geq4Qi6nBYBnH5s2z');
  filepicker.makeDropPane($('#dropzone')[0], {
    multiple: true,
    dragEnter: function() {
        $("#dropzone").html("Drop to upload").css({
            'backgroundColor': "#E0E0E0",
            'border': "1px dashed gray"
        });
    },
    dragLeave: function() {
        $("#dropzone").html("Drop files here").css({
            'backgroundColor': "#F6F6F6",
            'border': "1px dashed #666"
        });
    },
    onSuccess: function(InkBlobs) {
        
        var project_id = parseInt($("#dropzone").data("id"));
        var url = InkBlobs[0].url;
        $.post("/slides", { slide: { filepicker_url: InkBlobs[0].url}, project_id:project_id}, function(data){
          $("#dropzone").html($("<img>").attr('src', url));
        });

    },
    onError: function(type, message) {
        $("#localDropResult").text('('+type+') '+ message);
    },
    onProgress: function(percentage) {
        $("#dropzone").text("Uploading ("+percentage+"%)");
    }
  });
});