$(function (){
  filepicker.setKey('ALcB7Geq4Qi6nBYBnH5s2z');
  filepicker.makeDropPane($('#dropzone')[0], {
    multiple: true,
    dragEnter: function() {
        $("#dropzone").html("Drop to upload").css({
            'backgroundColor': "#E0E0E0",
            'border': "1px solid #000"
        });
    },
    dragLeave: function() {
        $("#dropzone").html("Drop files here").css({
            'backgroundColor': "#F6F6F6",
            'border': "1px dashed #666"
        });
    },
    onSuccess: function(InkBlobs) {
        $("#dropzone").text("Done, see result below");
        $.post("/slides", { slide: { filepicker_url: InkBlobs[0].url}, project_id:101}, function(data) {
        alert(data);
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